import { useLayout } from "@/context/layout-context";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

export function useCaptureFace() {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedFace, setCapturedFace] = useState<string | null>(null);
  // const [faceEncoding, setFaceEncoding] = useState<[Float64Array] | []>([]);
    const {startLoading, stopLoading} = useLayout();


  const captureFace = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedFace(imageSrc);
    }
  };

  const handleCaptureSubmit = async () => {
    startLoading();
    try {

      if (capturedFace) {
        const response = await fetch('http://127.0.0.1:5000/encode-face', {
          method: 'POST',
          body: JSON.stringify({ image: capturedFace }),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (data.success) {
          return [new Float64Array(data.encoding)]
        }
      }
    } catch (err) {
      throw "Flask not running";
    }
    stopLoading();
    return [];
  }


  return { webcamRef, capturedFace, captureFace, handleCaptureSubmit };
}