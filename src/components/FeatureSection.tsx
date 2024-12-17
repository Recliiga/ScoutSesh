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
    <div className="flex flex-col items-center gap-6 rounded-lg bg-white p-3 shadow-md sm:p-6 xl:flex-row">
      <div className="relative aspect-video h-full min-h-40 w-full flex-1 xl:aspect-auto">
        <Image
          src={imageSrc}
          alt={title}
          className="h-full w-full rounded-lg object-cover"
          fill
        />
      </div>
      <div className="xl:flex-1">
        <h2 className="mb-2 text-2xl font-semibold text-green-600">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
