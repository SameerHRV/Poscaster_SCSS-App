"use client";
import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";

const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
        <div className="podcast_grid">
          {podcastData.map(({ description, id, imgURL, title }) => {
            return <PodcastCard key={id} imgUrl={imgURL} title={title} description={description} podcastId={id} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
