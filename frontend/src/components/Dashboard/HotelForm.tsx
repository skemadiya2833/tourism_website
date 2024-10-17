import React, { useEffect, useState } from "react";
import ImagePreview from "@/components/Dashboard/ImagePreview";
import PlaceListDropDown from "@/components/common/PlaceListDropDown";
import { Upload } from "lucide-react";
import Cookie from "js-cookie";
import { RootState } from "../../Redux/store";
import {
  fetchHotelByIdRequest,
  createHotelRequest,
  updateHotelRequest,
} from "@/Redux/slices/hotelSlice";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Textarea,
  Input as ModalInput,
  Button,
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { deleteImageRequest } from "@/Redux/slices/imageSlice";
import { Image } from "@/types/common/image";
import { div } from "framer-motion/client";

type MouseOrFormEvent =
  | React.MouseEvent<HTMLElement>
  | React.FormEvent<HTMLFormElement>;

interface HotelFormProps {
  isModalOpen: boolean;
  closeModal: () => void;
  id?: string;
  isEdit: boolean;
  isView: boolean;
}

export const HotelForm: React.FC<HotelFormProps> = ({
  isModalOpen,
  closeModal,
  id,
  isEdit,
  isView,
}) => {

  const dispatch = useAppDispatch();
  const hotel = useAppSelector((state: RootState) => state.hotel.hotel);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    websiteLink: "",
    mapUrl: "",
    hotelStarRating: 0,
    address: "",
    price: 0,
    availableRooms: 0,
    contact: "",
    placeId: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [descriptionError, setDescriptionError] = useState("");
  const [existingImage, setExistingImage] = useState<Image[] | null>(null);

  useEffect(() => {
    if ((isEdit && id) || (isView && id)) {
        console.log(" this is hotel " , id)
      dispatch(fetchHotelByIdRequest(id));
    }
  }, [dispatch, isEdit, id, isView]);

  useEffect(() => {
    if (hotel && isEdit) {
      setFormData({
        name: hotel.name || "",
        description: hotel.description || "",
        websiteLink: hotel.websiteLink || "",
        mapUrl: hotel.mapUrl || "",
        hotelStarRating: hotel.hotelStarRating || 0,
        address: hotel.address || "",
        price: hotel.price || 0,
        availableRooms: hotel.availableRooms || 0,
        contact: hotel.contact || "",
        placeId: hotel.placeId || "",
      });

      setExistingImage(hotel?.images);
    }
  }, [hotel, isEdit]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "description") {
      const wordCount = value.split(/\s+/).length;
      if (wordCount > 125) {
        setDescriptionError("Description cannot exceed 125 words.");
        return;
      } else {
        setDescriptionError("");
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceChange = (placeId: string) => {
    setFormData({ ...formData, placeId });
  };

  const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleRemoveImage = (index: number, url?: string) => {
    if (isEdit && url && existingImage) {
      setExistingImage((prev) => prev?.filter((_, i) => i !== index) || []);
      dispatch(deleteImageRequest(url));
    } else {
      const updatedLocalImages = images.filter((_, i) => i !== index);
      setImages(updatedLocalImages);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
  };

  const handleSubmit = (e: MouseOrFormEvent) => {
    e.preventDefault();

    if (descriptionError) return;
    const userId = Cookie.get("userId");

    const data = new FormData();

    if (userId) {
      data.append("userId", userId);
    }

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });

    images.forEach((image) => {
      data.append("images", image);
    });

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    if (isEdit && id) {
      dispatch(updateHotelRequest({ id, data }));
      return;
    }
    dispatch(createHotelRequest(data));
  };

  return (
    <>
      {isView ? (
        <Modal
          isOpen={isModalOpen}
          size={"2xl"}
          placement={"top"}
          scrollBehavior={"inside"}
          onClose={closeModal}
        >
          <ModalContent>
            <ModalBody>
            <div>
                <span className="font-bold text-xl">Hotel Name: </span>
                <h2 className="text-sm">{hotel?.name}</h2>
              </div>
              <div>
                <span className="font-bold text-xl ">Description: </span>
                <h2 className="text-sm">{hotel?.description}</h2>
              </div>

              <div>
                <span className="font-bold text-xl ">Price: </span>
                <h2 className="text-sm">{hotel?.price}</h2>
              </div>
              <div>
                <span className="font-bold text-xl ">Star Rating: </span>
                <h2 className="text-sm">{hotel?.hotelStarRating}</h2>
              </div>

              {hotel?.contact &&  <div>
                <span className="font-bold text-xl ">Contact: </span>
                <h2 className="text-sm">{hotel?.contact}</h2>
              </div>}

              <div className="mt-4">
                <h4>Thumbnail:</h4>
                {hotel?.thumbnailUrl && (
                  <img
                    src={hotel.thumbnailUrl}
                    alt={hotel.name}
                    className="max-w-full h-auto"
                  />
                )}
              </div>

              <div className="mt-4">
                <h4>Images:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {hotel?.images.map((image:Image, index) => (
                    <img
                      key={index}
                      src={image.link}
                      alt={`Image ${index + 1}`}
                      className="max-w-full h-auto"
                    />
                  ))}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalBody className="max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <ModalInput
                  fullWidth
                  label="Name"
                  placeholder="Hotel Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mb-2"
                  required
                />
                <Textarea
                  label="Description"
                  placeholder="Enter hotel description (Max 125 words)"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mb-2"
                  required
                />
                <PlaceListDropDown onPlaceChange={handlePlaceChange} />
                <ModalInput
                  fullWidth
                  type="url"
                  label="Website URL"
                  placeholder="Enter Website Link"
                  name="websiteLink"
                  value={formData.websiteLink}
                  className="mb-2"
                  onChange={handleInputChange}
                />
                <ModalInput
                  type="url"
                  label="Map URL"
                  name="mapUrl"
                  placeholder="Enter Map URL"
                  value={formData.mapUrl}
                  onChange={handleInputChange}
                  className="mb-2"
                  required
                />
                <ModalInput
                  type="number"
                  label="Star Rating"
                  name="hotelStarRating"
                  value={formData.hotelStarRating.toString()}
                  onChange={handleInputChange}
                  className="mb-2"
                  required
                  min={1}
                  max={5}
                />
                <ModalInput
                  type="number"
                  label="Price per Day"
                  name="price"
                  value={formData.price.toString()}
                  onChange={handleInputChange}
                  className="mb-2"
                  required
                />
                <ModalInput
                  type="number"
                  label="Available Rooms"
                  name="availableRooms"
                  value={formData.availableRooms.toString()}
                  onChange={handleInputChange}
                  className="mb-2"
                  required
                />
                <ModalInput
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mb-2"
                  placeholder="Enter Address"
                  required
                />
                <ModalInput
                  label="Contact"
                  name="contact"
                  placeholder="Enter Contact Number"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="mb-2"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Images
                  </label>
                  {images.map((file, index) => (
                    <ImagePreview
                      key={index}
                      file={file}
                      onRemove={() => handleRemoveImage(index)}
                    />
                  ))}
                  {isEdit &&
                    existingImage &&
                    existingImage?.map((file, index) => (
                      <ImagePreview
                        key={index}
                        file={file.link}
                        onRemove={() => handleRemoveImage(index, file.link)}
                      />
                    ))}
                  <label className="flex justify-center items-center w-full h-32 mt-2 border-2 border-dashed border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-sm">
                        Upload images or drag and drop
                      </span>
                    </div>
                    <input
                      type="file"
                      multiple
                      onChange={handleImagesUpload}
                      className="sr-only"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Thumbnail
                  </label>
                  {thumbnail && (
                    <ImagePreview
                      file={thumbnail}
                      onRemove={handleRemoveThumbnail}
                    />
                  )}
                  <label className="flex justify-center items-center w-full h-32 mt-2 border-2 border-dashed border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-400 mb-2" />
                      <span className="text-sm">
                        Upload images or drag and drop
                      </span>
                    </div>
                    <input
                      type="file"
                      multiple
                      onChange={handleThumbnailUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button onClick={closeModal}>Cancel</Button>
              <Button color="primary" onClick={handleSubmit}>
                {isEdit ? "Update Hotel" : "Add Hotel"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
