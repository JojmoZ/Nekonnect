import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";

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
                <Button onClick={onClose}>Close</Button>
            </DialogContent>
        </Dialog>
    );
}

export default SuccessDialog;