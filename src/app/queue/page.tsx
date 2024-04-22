"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

type Props = {};

const QueuePage = (props: Props) => {
  const [queue, setQueue] = useState<string[] | null>(null);
  const [activeDownload, setActiveDownload] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/queue");
      const data = await res.json();
      setQueue(data.queue);
      setActiveDownload(data.activeDownload);
    };
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
              style={{ gridTemplateColumns: "auto 1fr" }}
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
