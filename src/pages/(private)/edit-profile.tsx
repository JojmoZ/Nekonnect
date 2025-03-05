import Webcam from 'react-webcam';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import PersonalInformationForm from '@/components/custom/profile/personal-information-form';
import Stepper from '@/components/stepper';
import { useCaptureFace } from '@/hooks/user/use-capture-face';
import { useEditProfile } from '@/hooks/user/use-edit-profile';
import { useState } from 'react';

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

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      await handleCaptureSubmit();
      await handleEdit();
      navigate('/temp');
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
        <div className="text-center">
          <h2>Step 2: Face Capture</h2>
          <Webcam ref={webcamRef} screenshotFormat="image/png" />
          <br />

          <Button type="button" onClick={captureFace} className="mt-2">
            Capture Face
          </Button>

          {/* Display Captured Face */}
          {capturedFace && (
            <div className="mt-4">
              <h3>Captured Face Preview:</h3>
              <img
                src={capturedFace}
                alt="Captured Face"
                style={{ maxWidth: '200px' }}
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
