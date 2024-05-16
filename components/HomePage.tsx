"use client";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="p-6 gap-32 flex flex-col">
      <section className="h-fit flex lg:flex-row flex-col gap-10 bg-secondary px-4 py-20 w-full">
        <div className="flex-1 space-y-4 flex flex-col justify-center">
          <h1 className="text-4xl">
            Discover Music Like Never Before.
            <br />
            Explore new tunes through the art of album covers.
          </h1>
          <h2 className="text-xl leading-relaxed">
            {`Welcome to Covertune, where your musical journey begins with the visual allure of album covers. We believe that a picture is worth a thousand songs, and each cover holds a story waiting to be discovered.`}
          </h2>
          <h2 className="text-xl leading-relaxed">
            {`Dive into a world where music discovery is as much about what you see as what you hear. Whether you’re a fan of rock, jazz, pop, or classical, our platform offers a unique way to find new music based on album art that catches your eye.`}
          </h2>
          <div className="flex justify-center items-center">
            <Link
              href={"/categories"}
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              START NOW
            </Link>
          </div>
        </div>
        <div className="flex-1">
        <Image
              alt="screen capture of the app"
              src={"/screencapture.png"}
              width={800}
              height={600}
            />
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        <div className="">
        <h1 className="text-3xl">Curated Categories</h1>
        <h2 className="text-xl leading-relaxed text-justify">
          {`Choose from a variety of music genres and moods. Each category is meticulously curated to ensure you find something that resonates with your tastes.`}
        </h2>
        </div>
        <div className="">
        <h1 className="text-3xl">Detailed Insights</h1>
        <h2 className="text-xl leading-relaxed text-justify">
          {` Click on any album cover to uncover detailed information about the artist, album, and more. Get to know the story behind the art.`}
        </h2>
        </div>
        <div className="">
        <h1 className="text-3xl">Seamless Listening</h1>
        <h2 className="text-xl leading-relaxed text-justify">
          {` Enjoy instant access to music. Each album cover comes with a direct link to listen on Spotify, making your music discovery seamless and enjoyable.`}
        </h2>
        </div>
        <div className="">
        <h1 className="text-3xl">Personalization</h1>
        <h2 className="text-xl leading-relaxed text-justify">
          {` Create a personalized profile to save your favorite discoveries, and get recommendations based on your preferences.`}
        </h2>
        </div>
      </section>
      <section className="space-y-4 text-center">
        <h1 className="text-3xl">Ready to Discover New Music?</h1>
        <h2 className="text-xl leading-relaxed">
          {`Start your journey with Covertune today.`}
          <br/>
          {`Join our community of music enthusiasts and start exploring music in a way you've never experienced before. Sign up now and make your musical discovery visually exciting and endlessly rewarding.`}
        </h2>
        <div className="flex justify-center items-center">
          <Link
            href={"/categories"}
            className={buttonVariants({ variant: "default", size: "lg" })}
          >
            START NOW
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
