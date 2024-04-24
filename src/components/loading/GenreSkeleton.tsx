import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const GenreSkeleton = (props: Props) => {
  return (
    <div className="w-full inset-0 absolute flex flex-col gap-4 p-4">
      <div>
        <Skeleton className="h-6 w-1/2 rounded-lg" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="flex flex-col h-full">
            <CardHeader className="flex-grow">
              <CardTitle>
                <Skeleton className="h-6 w-full rounded-lg" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg relative aspect-[11/16] overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GenreSkeleton;
