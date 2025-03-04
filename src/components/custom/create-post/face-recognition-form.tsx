import { Button } from '@/components/ui/button';
import { useVerifyFace } from '@/hooks/user/use-verify-face';
import { User } from 'lucide-react';
import Webcam from 'react-webcam';

interface ChildProps {
  verificator: ReturnType<typeof useVerifyFace>;
}

export function FaceRecognitionForm({ verificator }: ChildProps) {

  return (
    <div>
      <h2 className="ml-6 text-lg font-semibold">Face Recognition</h2>
      <p className="ml-6 text-gray-600 text-m">Say "nekonnect"</p>
      <p className="ml-6 text-gray-600 text-sm">
        Please ensure your camera is active.
      </p>

      <Webcam ref={verificator.webcamRef} screenshotFormat="image/png" />

      <div className="h-80 mx-6 my-3 rounded-lg flex items-center justify-center bg-gray-50 border-2 border-gray-100">
        <User className="text-gray-300 w-16 h-16" />
      </div>

      <Button type="button" onClick={verificator.captureFace} className="mt-2">
        Capture Face
      </Button>

      {/* Display Captured Face */}
      {verificator.capturedFace && (
        <div className="mt-4">
          <h3>Captured Face Preview:</h3>
          <img
            src={verificator.capturedFace}
            alt="Captured Face"
            style={{ maxWidth: '200px' }}
          />
        </div>
      )}

      <div className="flex justify-end mt-4">
        <Button type="button"
          onClick={verificator.verifyFace}
          disabled={verificator.loading}>Start Recognition</Button>
      </div>
    </div>
  );
}
