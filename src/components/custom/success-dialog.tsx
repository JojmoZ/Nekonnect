import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

interface SuccessDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

function SuccessDialog({ isOpen, onClose, title, description }: SuccessDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <Button onClick={onClose}>Continue</Button>
            </DialogContent>
        </Dialog>
    );
}

export default SuccessDialog;