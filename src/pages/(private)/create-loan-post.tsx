import { FormProvider } from 'react-hook-form';
import Stepper from '@/components/stepper';
import CreateLoanForm from '../../components/custom/create-post/create-loan-form';
import AssuranceForm from '../../components/custom/create-post/assurance-form';
import LoanAgreementForm from '@/components/custom/create-post/loan-agreement-form';
import { toast } from 'sonner';
import { FaceRecognitionForm } from '@/components/custom/create-post/face-recognition-form';
import { useCreateLoanPost } from '@/hooks/loan-post/use-create-loan-post';
import { useState } from 'react';
import SuccessDialog from '@/components/custom/success-dialog';
import { useNavigate } from 'react-router';
import { useVerifyFace } from '@/hooks/user/use-verify-face';

function CreateLoanPostPage() {
  const { loanPostForm, assuranceForm, agreementForm, onCreate } = useCreateLoanPost();
  const verificator = useVerifyFace();
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async () => {
    const isTermsAccepted = agreementForm.watch("terms");
    if(isTermsAccepted){
      toast.promise(onCreate(), {
        loading: 'Creating loan post...',
        success: () => {
          setIsSuccessDialogOpen(true);
          return 'Loan post created successfully.'
        },
        error: 'Failed to create loan post.',
      });
    }else{
      toast.promise(onCreate()) // error dialog
    }    
  };

  const handleClose = () => {
    setIsSuccessDialogOpen(false);
    navigate('/');
  }

  const steps = [
    {
      title: 'Step 1: Loan Details',
      description: 'Enter the details for your loan post.',
      content: (
        <FormProvider {...loanPostForm}>
          <CreateLoanForm />
        </FormProvider>
      ),
      onNext: async () => {
        const isValid = await loanPostForm.trigger();
        return isValid;
      },
    },
    {
      title: 'Step 2: Assurance',
      description: 'Upload the assurance image.',
      content: (
        <FormProvider {...assuranceForm}>
          <AssuranceForm />
        </FormProvider>
      ),
      onNext: async () => {
        const isValid = await assuranceForm.trigger();
        return isValid;
      },
    },
    {
      title: 'Step 3: Verification',
      description: 'We should verify you before proceeding.',
      content: (
        <FaceRecognitionForm verificator={verificator} />
      ),
      onNext: async () => {
        return verificator.verificationResult
      }
    },
    {
      title: 'Step 4: Agreement',
      description: 'Please read the agreement before submitting.',
      content: (
        <FormProvider {...agreementForm}>
          <LoanAgreementForm />
        </FormProvider>
      ),
    },
  ];

  return (
    <div className='container py-8'>
      <h1 className="text-3xl font-bold mb-8 text-center">
        Apply for Loan
      </h1>
      <Stepper steps={steps} onSubmit={onSubmit} showProgress={true} />
      <SuccessDialog
        isOpen={isSuccessDialogOpen}
        onClose={handleClose}
        title="Loan Post Requested Successfully"
        description="Your loan post has been requested successfully. Please wait until we verify your post."
      />
    </div>
  );
}

export default CreateLoanPostPage;
