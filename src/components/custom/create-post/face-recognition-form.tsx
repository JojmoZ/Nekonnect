import { Button } from '@/components/ui/button';
import { useVerifyFace } from '@/hooks/user/use-verify-face';
import { User } from 'lucide-react';
import { useState } from 'react';
import Webcam from 'react-webcam';

interface ChildProps {
  verificator: ReturnType<typeof useVerifyFace>;
}

export function FaceRecognitionForm({ verificator }: ChildProps) {
  const [cameraAvailable, setCameraAvailable] = useState<boolean>(true);

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold">Face Recognition</h2>
      <p className="text-gray-600 text-sm">
        Please ensure your camera is active.
      </p>

      {cameraAvailable && (
        <Webcam
          ref={verificator.webcamRef}
          className="w-full my-3 rounded-lg flex items-center justify-center bg-gray-50 border-2 border-gray-100"
          screenshotFormat="image/png"
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: 'user',
          }}
          onUserMedia={() => setCameraAvailable(true)}
          onUserMediaError={() => setCameraAvailable(false)}
        />
      )}

      {!cameraAvailable && (
        <div className="w-full my-3 rounded-lg flex items-center justify-center bg-gray-50 border-2 border-gray-100">
          <User className="text-gray-300 w-16 h-16" />
          <p className="ml-6 text-red-500 text-sm">
            Camera is not detected. Please allow camera access.
          </p>
        </div>
      )}

      <Button
        type="button"
        variant={'default'}
        onClick={verificator.captureFace}
        className="mt-2 w-full"
      >
        Capture Face
      </Button>

      {/* Display Captured Face */}
      {verificator.capturedFace && (
        <div className="mt-4 space-y-2">
          <h2 className="text-lg font-semibold">Captured Face Preview: </h2>
          <img
            src={verificator.capturedFace}
            alt="Captured Face"
            className="w-full rounded-lg"
          />
        </div>
      )}

      <div className="flex justify-end mt-4">
        <Button
          type="button"
          onClick={verificator.verifyFace}
          disabled={verificator.loading}
          className="w-full"
        >
          Start Recognition
        </Button>
      </div>
    </div>
  );
}
