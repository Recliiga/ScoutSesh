import React from "react";

export default function Card({
  className,
  icon,
  title,
  description,
}: {
  className: string;
  icon: React.JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <div className={" " + className}>
      <div className="flex justify-center items-center mb-4">{icon}</div>
      <h3 className="font-semibold text-xl">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
