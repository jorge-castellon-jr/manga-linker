import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type Props = {};

const MangaSkeleton = (props: Props) => {
  return (
    <div className="w-full inset-0 absolute flex flex-col gap-4 p-4">
      <div>
        <Card className="flex flex-col h-full">
          <CardHeader className="flex-grow">
            <CardTitle>
              <Skeleton className="h-12 w-full rounded-lg" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6">
              <div className="rounded-lg relative aspect-[11/16] overflow-hidden col-span-2">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="col-start-4 col-span-3 flex flex-col gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
                <div className="flex justify-center gap-4">
                  <Skeleton className="h-10 w-10" />
                  <Skeleton className="h-10 w-10" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 11 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle
                className="grid  gap-2"
                style={{ gridTemplateColumns: "1fr auto" }}
              >
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-8" />
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MangaSkeleton;
