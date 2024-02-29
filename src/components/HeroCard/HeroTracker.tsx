"use client";

import { useEffect, useState } from "react";

export default function HeroTracker({
  label,
  max,
  start,
}: {
  label: string;
  max: number;
  start: number;
}) {
  const [activeTracker, setActiveTracker] = useState(0);

  const trackers = Array.from({ length: max + 1 }, (_, index) => index);

  const handleClick = (index: number) => {
    setActiveTracker(index);
  };

  useEffect(() => {
    setActiveTracker(start);
  }, [start]);

  return (
    <div className="px-2">
      <div>{label}</div>
      <div className="flex justify-between">
        {trackers.map((index) => (
          <div key={index}>
            <div
              onClick={() => handleClick(index)}
              className={`grid place-items-center text-white w-12 h-12 border border-white ${
                index === activeTracker ? "bg-teal-600" : "bg-orange-900"
              }`}
            >
              {index}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
