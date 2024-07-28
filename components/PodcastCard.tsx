import Image from "next/image";
import React from "react";

interface PodcastCardProps {
  imgUrl: string;
  title: string;
  description: string;
  podcastId: number;
}

const PodcastCard = ({ imgUrl, title, description, podcastId }: PodcastCardProps) => {
  return (
    <div className="cursor-pointer">
      <figure className="flex flex-col gap-2">
        <Image
          src={imgUrl}
          alt={title}
          width={174}
          height={174}
          className="rounded-lg aspect-square h-fit w-full 2xl:size-[200px]"
        />
        <div className="flex flex-col gap-1">
          <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
          <p className="text-12 truncate text-white-4 capitalize font-normal">{description}</p>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCard;
