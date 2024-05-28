"use client";

import React from "react";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "./ui/badge";
import { Link } from "@/navigation";

const HomePage = () => {
  const th = useTranslations('HomePage.hero');
  const td = useTranslations('HomePage.descriptions');
  const tf = useTranslations('HomePage.footer');

  return (
    <div className="p-6 gap-32 flex flex-col">
      <section className="h-fit flex lg:flex-row flex-col gap-10 bg-secondary px-4 py-20 w-full">
        <div className="flex-1 space-y-4 flex flex-col justify-center">
          <h1 className="text-4xl">
            {th('header')}
            <br />
            {th('subheader')}
          </h1>
          <h2 className="text-xl leading-relaxed">
            {th('body1')}
          </h2>
          <h2 className="text-xl leading-relaxed">
            {th('body2')}
          </h2>
          <div className="flex justify-center items-center">
            <Link
              href={"/categories"}
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              {th("cta")}
            </Link>
          </div>
        </div>
        <div className="flex-1">
        <Image
        priority={true}
        className="w-auto h-auto"
              alt="screen capture of the app"
              src={"/screencapture.png"}
              width={800}
              height={600}
            />
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        <div className="">
        <h1 className="text-3xl">{td('description1.header')}</h1>
        <h2 className="text-xl leading-relaxed text-justify">
          {td('description1.body')}
        </h2>
        </div>
        <div className="">
        <h1 className="text-3xl">{td('description2.header')}</h1>
        <h2 className="text-xl leading-relaxed text-justify">
          {td('description2.body')}
        </h2>
        </div>
        <div className="">
        <h1 className="text-3xl">{td('description3.header')}</h1>
        <h2 className="text-xl leading-relaxed text-justify">
          {td('description3.body')}
        </h2>
        </div>
        <div className="">
        <div className="md:flex justify-between">
        <h1 className="text-3xl">{td('description4.header')}</h1>
        <Badge variant="default">
                {td('description4.badge')}
          </Badge>
          </div>
        <h2 className="text-xl leading-relaxed text-justify">
          {td('description4.body')}
        </h2>
        </div>
      </section>
      <section className="space-y-4 text-center">
        <h1 className="text-3xl">{tf('header')}</h1>
        <h2 className="text-xl leading-relaxed">
          {tf('body1')}
          <br/>
          {tf('body2')}
        </h2>
        <div className="flex justify-center items-center">
          <Link
            href={"/categories"}
            className={buttonVariants({ variant: "default", size: "lg" })}
          >
            {tf('cta')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
