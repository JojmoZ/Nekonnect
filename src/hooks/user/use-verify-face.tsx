import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import useServiceContext from "../use-service-context";

export function useVerifyFace() {
    const webcamRef = useRef<Webcam | null>(null);
    const [capturedFace, setCapturedFace] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [storedEncoding, setStoredEncoding] = useState<number[] | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [verificationResult, setVerificationResult] = useState<boolean>(false);
    const { userService } = useServiceContext();

    useEffect(() => {
        const fetchUserFaceEncoding = async () => {
            try {
                const user = await userService.me();
                if (user && user.faceEncoding && user.faceEncoding.length > 0 && user.faceEncoding[0]) {
                    setStoredEncoding(Array.from(user.faceEncoding[0] as number[])); // ✅ Safe conversion
                } else {
                    setStoredEncoding(null); // ✅ No stored encoding
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setStoredEncoding(null);
            }
        };

        fetchUserFaceEncoding();
    }, []);

    // Capture Face Image
    const captureFace = async () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedFace(imageSrc);
        }
    };

    // Verify Face with Stored Encoding
    const verifyFace = async () => {
        console.log("Verify Face");
        if (!capturedFace || !storedEncoding) {
            setMessage("No stored face encoding found.");
            setVerificationResult(false);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/verify-face", {
                method: "POST",
                body: JSON.stringify({
                    image: capturedFace,
                    encoding: storedEncoding, // Send stored encoding for comparison
                }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (data.success) {
                setMessage(data.match ? "✅ Same Face" : "❌ Not the same face");
                setVerificationResult(data.match);
            } else {
                setMessage("❌ Not the same face");
                setVerificationResult(false);
            }
        } catch (error) {
            console.error("Error verifying face:", error);
            setMessage("Verification failed.");
            setVerificationResult(false);
        }
        setLoading(false);
    };

    return { webcamRef, capturedFace, captureFace, verifyFace, message, verificationResult, loading };
}