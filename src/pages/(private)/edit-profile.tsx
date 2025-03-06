import Webcam from 'react-webcam';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import PersonalInformationForm from '@/components/custom/profile/personal-information-form';
import Stepper from '@/components/stepper';
import { useCaptureFace } from '@/hooks/user/use-capture-face';
import { useEditProfile } from '@/hooks/user/use-edit-profile';
import { useState } from 'react';
import { User } from 'lucide-react';

export const EditProfilePage = () => {
  const navigate = useNavigate();

  const {
    webcamRef,
    capturedFace,
    captureFace,
    faceEncoding,
    handleCaptureSubmit,
  } = useCaptureFace();
  const { userForm, handleEdit } = useEditProfile({ faceEncoding });
  const [loading, setLoading] = useState<boolean>(false);
  const [cameraAvailable, setCameraAvailable] = useState<boolean>(true);

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      await handleCaptureSubmit();
      await handleEdit().finally(() => {
        navigate('/home');
      }
      );

    } catch (err) {
      console.error('Error updating profile:', err);
    }
    setLoading(false);
  };

  const steps = [
    {
      title: 'Step 1: User Information',
      description: 'Enter your personal information.',
      content: (
        <FormProvider {...userForm}>
          <PersonalInformationForm />
        </FormProvider>
      ),
      onNext: async () => {
        const isValid = await userForm.trigger();
        return isValid;
      },
    },
    {
      title: 'Step 2: Face Capture',
      description: 'Capture your face for verification.',
      content: (
        <div className="">
          <h2 className="text-lg font-semibold">Face Recognition</h2>
          <p className="text-gray-600 text-sm">
            Please ensure your camera is active.
          </p>
          {cameraAvailable && (
            <Webcam
              ref={webcamRef}
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

          <Button type="button" onClick={captureFace} className="mt-2 w-full">
            Capture Face
          </Button>

          {/* Display Captured Face */}
          {capturedFace && (
            <div className="mt-4 space-y-2">
              <h2 className="text-lg font-semibold">Captured Face Preview: </h2>
              <img
                src={capturedFace}
                alt="Captured Face"
                className='w-full rounded-lg'
              />
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className='container py-8'>
      <h1 className="text-3xl font-bold mb-8 text-center">
        Edit Profile
      </h1>
      <Stepper steps={steps} onSubmit={handleFinalSubmit} showProgress loading={loading} />
    </div>
  );
};
