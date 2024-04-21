import { SingleMangaChapter } from "@/app/api/manga/[id]/GetSingleManga";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheckIcon, DownloadCloudIcon } from "lucide-react";
import React from "react";

type Props = {
  chapter: SingleMangaChapter;
  onClick?: () => void;
};

const ChapterButton = ({ chapter, onClick }: Props) => {
  const isDownloaded = chapter.downloadedImages.length === chapter.totalImages;
  return (
    <Card
      key={chapter.id}
      className={
        isDownloaded
          ? "cursor-pointer"
          : "bg-opacity-50 bg-slate-200 dark:bg-opacity-50 dark:bg-slate-900"
      }
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex justify-between gap-2">
          <div className="truncate">{chapter.title}</div>
          <div>
            {isDownloaded ? (
              <BadgeCheckIcon className="icon" />
            ) : (
              <DownloadCloudIcon className="icon" />
            )}
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ChapterButton;
