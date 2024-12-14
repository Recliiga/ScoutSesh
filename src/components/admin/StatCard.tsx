import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function StatCard({
  title,
  value,
  change,
  subtext,
  className = "",
  icon,
}: {
  title: string;
  value: string | number;
  change?: string;
  subtext?: string;
  className?: string;
  icon?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && <p className="text-xs text-muted-foreground">{change}</p>}
        {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
      </CardContent>
    </Card>
  );
}
