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
}: {
  title: string;
  description: string;
  icon: React.ReactElement;
  actionText: string;
  href: string;
}) {
  return (
    <Card className="flex flex-col w-full h-full">
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
        <Button className="px-0 py-0 w-full">
          <Link href={href} className="flex-center w-full h-full">
            {actionText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
