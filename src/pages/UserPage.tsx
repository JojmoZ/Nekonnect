import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { UserService } from "@/services/user.service";

const userService = new UserService();

const UserPage = () => {
    const webcamRef = useRef<Webcam | null>(null);
    const [capturedFace, setCapturedFace] = useState<string | null>(null);
    const [verificationResult, setVerificationResult] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [storedEncoding, setStoredEncoding] = useState<number[] | null>(null);

    useEffect(() => {
    const fetchUserFaceEncoding = async () => {
        try {
            const user = await userService.me();
            if (user.faceEncoding && user.faceEncoding.length > 0 && user.faceEncoding[0]) {
                setStoredEncoding(Array.from(user.faceEncoding[0] as number[])); // ✅ Safe conversion
                console.log(storedEncoding)
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
        if (!capturedFace || !storedEncoding) {
            setVerificationResult("No stored face encoding found.");
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
                setVerificationResult(data.match ? "✅ Same Face" : "❌ Not the same face");
            } else {
                setVerificationResult("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error verifying face:", error);
            setVerificationResult("Verification failed.");
        }
        setLoading(false);
    };

    return (
        <div className="text-center">
            <h1>Face Verification</h1>
            <Webcam ref={webcamRef} screenshotFormat="image/png" />
            <br />

            <Button type="button" onClick={captureFace} className="mt-2">
                Capture Face
            </Button>

            {/* Display Captured Image */}
            {capturedFace && (
                <div className="mt-4">
                    <h3>Captured Face Preview:</h3>
                    <img src={capturedFace} alt="Captured Face" style={{ maxWidth: "200px" }} />
                </div>
            )}

            {/* Verify Face */}
            <Button 
                type="button" 
                onClick={verifyFace} 
                className="mt-4"
                disabled={loading}
            >
                {loading ? "Verifying..." : "Verify Face"}
            </Button>

            {/* Display Verification Result */}
            {verificationResult && (
                <p className="mt-4 text-lg font-bold">{verificationResult}</p>
            )}
        </div>
    );
};

export default UserPage;
