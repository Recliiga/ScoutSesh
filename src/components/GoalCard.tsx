import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function GoalCard({
  title,
  description,
  icon,
  actionText,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactElement;
  actionText: string;
  onClick: () => void;
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
        <CardDescription className="h-32 overflow-y-auto">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" onClick={onClick}>
          {actionText}
        </Button>
      </CardFooter>
    </Card>
  );
}
