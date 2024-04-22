"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLinkIcon, ShareIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {};

const QueuePage = (props: Props) => {
  const [queue, setQueue] = useState<string[] | null>(null);
  const [activeDownload, setActiveDownload] = useState<string | null>(null);
  const fetchData = async () => {
    const res = await fetch("/api/queue");
    const data = await res.json();
    setQueue(data.queue);
    setActiveDownload(data.activeDownload);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeIndex = (currentIndex: number, newIndex: number) => {
    if (!queue) return;
    const updatedItems = [...queue];

    // Remove the item from its current index
    const [movedItem] = updatedItems.splice(currentIndex, 1);

    // Insert the item at the new index
    updatedItems.splice(newIndex, 0, movedItem);

    setQueue(updatedItems);
  };

  return (
    <div className="grid gap-8 p-4">
      <h1 className="text-5xl">Queue</h1>
      <div className="flex gap-4">
        <Button
          onClick={async () => {
            fetchData();
          }}
        >
          Refresh
        </Button>
        <Button
          onClick={async () => {
            await fetch("/api/queue", { method: "DELETE" });
            fetchData();
          }}
        >
          Clear Queue
        </Button>
      </div>
      {queue && (
        <>
          <div>
            <h2 className="text-2xl">Active Download</h2>
            <div>{activeDownload}</div>
          </div>
          <div>
            <h2 className="text-2xl">Queue</h2>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "auto 1fr auto" }}
            >
              {queue.map((item, index) => (
                <>
                  <div>
                    {index}
                    {/* <Input
                      defaultValue={index}
                      onBlur={(e) => {
                        const newIndex = parseInt(e.target.value, 10);
                        if (newIndex >= 0 && newIndex < queue.length) {
                          handleChangeIndex(index, newIndex);
                        }
                      }}
                    /> */}
                  </div>
                  <div>{item}</div>
                  <Link href={`/manga/${item.split("/")[0]}`}>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <ExternalLinkIcon className="icon" />
                    </Button>
                  </Link>
                  {/* <Button
										onClick={async () => {
											await fetch("/api/queue", {
												method: "DELETE",
												body: JSON.stringify({ id: item }),
											});
											fetchData();
										}}
									>
										Remove
									</Button> */}
                </>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QueuePage;
