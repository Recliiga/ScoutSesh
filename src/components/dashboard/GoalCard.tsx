import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function GoalCard({
  title,
  description,
  icon,
  actionText,
  href,
  disabled = false,
}: {
  title: string;
  description: string;
  icon: React.ReactElement;
  actionText: string;
  href: string;
  disabled?: boolean;
}) {
  return (
    <Card className="flex h-full w-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          className="w-full px-0 py-0 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          <Link href={href} className="flex-center h-full w-full">
            {actionText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
