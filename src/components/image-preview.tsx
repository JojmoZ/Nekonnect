import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface ImagePreviewProps {
    imageFile: File;
    className?: string;
}

const ImagePreview = ({ imageFile, className: classname }: ImagePreviewProps) => {

    if (!imageFile) return null;

    const imageUrl = URL.createObjectURL(imageFile);

    return (
        <div className={`${classname}`}>
            <Dialog>
                <DialogTrigger className={`${classname}`}>
                    <img className={`${classname}`} src={imageUrl} alt="Preview" />
                </DialogTrigger>
                <DialogContent className="p-10">
                    <img src={imageUrl} alt="Preview" />
                </DialogContent>
            </Dialog>
        </div>
    );
}
 
export default ImagePreview;