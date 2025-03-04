import { useRef, useState } from "react";
import Webcam from "react-webcam";
import useServiceContext from "../use-service-context";

export function useCaptureFace() {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedFace, setCapturedFace] = useState<string | null>(null);
  const [faceEncoding, setFaceEncoding] = useState<[Float64Array] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { userService } = useServiceContext();

  const captureFace = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedFace(imageSrc);
    }
  };

  const handleCaptureSubmit = async () => {
    setLoading(true);
    try {

      if (capturedFace) {
        const response = await fetch('http://127.0.0.1:5000/encode-face', {
          method: 'POST',
          body: JSON.stringify({ image: capturedFace }),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        console.log('MY FACE', data);
        if (data.success) {
          setFaceEncoding([new Float64Array(data.encoding)]);
        }
      }
      console.log('AFTER UINT8', faceEncoding);
    } catch (err) {
      console.error('Error submitting captured face:', err);
    }
    setLoading(false);
  }


  return { webcamRef, capturedFace, captureFace, handleCaptureSubmit, faceEncoding, loading };
}