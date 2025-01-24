import Error from "@/components/AuthError";
import { Input } from "@/components/ui/input";
import Image, { StaticImageData } from "next/image";

export default function ThumbnailField({
  thumbnail,
  placeholderThumbnail,
  handleChangeThumbnail,
  thumbnailError,
  required,
}: {
  thumbnail: string;
  placeholderThumbnail: StaticImageData;
  handleChangeThumbnail(e: React.ChangeEvent<HTMLInputElement>): Promise<void>;
  thumbnailError: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">Thumbnail</h3>
      <div className="flex-center relative aspect-video w-full overflow-hidden rounded-md border">
        <Image
          src={thumbnail || placeholderThumbnail}
          alt="Thumbnail"
          fill
          sizes="1024px"
          priority
          className="absolute h-full w-full object-cover"
        />
      </div>
      <Input
        id="thumbnail"
        name="thumbnail"
        onChange={handleChangeThumbnail}
        type="file"
        accept="image/*"
        required={required}
        className="text-sm"
      />
      {thumbnailError && <Error error={thumbnailError} />}
    </div>
  );
}
