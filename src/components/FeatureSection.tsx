import Image from "next/image";

export default function FeatureSection({
  title,
  description,
  imageSrc,
}: {
  title: string;
  description: string;
  imageSrc: string;
}) {
  return (
    <div className="flex xl:flex-row flex-col items-center gap-6 bg-white shadow-md p-3 sm:p-6 rounded-lg">
      <div className="relative flex-1 w-full aspect-video xl:aspect-auto h-full">
        <Image
          src={imageSrc}
          alt={title}
          className="rounded-lg w-full h-full object-cover"
          fill
        />
      </div>
      <div className="flex-1">
        <h2 className="mb-2 font-semibold text-2xl text-green-600">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
