import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function FaceRecognitionForm() {
  return (
    <div>
      <h2 className="ml-6 text-lg font-semibold">Face Recognition</h2>
      <p className="ml-6 text-gray-600 text-m">Say "nekonnect"</p>
      <p className="ml-6 text-gray-600 text-sm">
        Please ensure your camera is active.
      </p>

      <div className="h-80 mx-6 my-3 rounded-lg flex items-center justify-center bg-gray-50 border-2 border-gray-100">
        <User className="text-gray-300 w-16 h-16" />
      </div>
      <div className="flex justify-end mt-4">
        <Button>Start Recognition</Button>
      </div>
    </div>
  );
}
