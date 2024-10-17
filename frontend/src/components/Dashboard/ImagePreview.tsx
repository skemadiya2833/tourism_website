import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ImagePreviewProps {
  file: File | string;
  onRemove: () => void;
  isEdit?: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  onRemove,
  isEdit,
}) => {

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (typeof file === "string") {
      setPreview(file);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    return () => {
      reader.abort();
    };
  }, [file]);

  return (
    <div className="relative inline-block mr-1">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-20 h-20 object-cover rounded-md"
        />
      )}
      <button
        onClick={onRemove}
        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
        aria-label="Remove image"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
};

export default ImagePreview;
