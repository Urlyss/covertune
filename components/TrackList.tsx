
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { buttonVariants } from "./ui/button";
import { FaExternalLinkAlt } from "react-icons/fa";
import { extractColors } from "extract-colors";
import { contrastColor } from "contrast-color";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
type TrackType = {
  track: {
    name: string;
    id: string;
    artists: {
      uri: string;
      href: string;
      name: string;
    }[];
    album: {
      id: string;
      uri: string;
      href: string;
      name: string;
      images: {
        height: number;
        width: number;
        url: string;
      }[];
    };
  };
};

const TrackItem = ({ track }: { track: TrackType }) => {
  const [coverPalette, setCoverPalette] = useState("");
  const [contrastCoverPalette, setContrastCoverPalette] = useState("");
  const tt = useTranslations('TrackList');

  useEffect(() => {
    // Get the element by album ID and set its 'src' attribute to the album's href
    const src = document.getElementById(
      track.track.album.id
    ) as HTMLImageElement;

    // Check if the 'src' attribute was set successfully
    if (src) {
      // Extract colors from the source image
      extractColors(src)
        .then((data) => {
          // Sort the extracted colors by the area they cover, in descending order
          let sortedData = data.sort((col1, col2) => col2.area - col1.area);

          // Get the color with the most area in the image
          const primaryColor = sortedData[0].hex;

          // Determine a contrasting color for the text
          const textColor = contrastColor({ bgColor: primaryColor });

          // Update the cover palette with the primary color
          setCoverPalette(primaryColor);

          // Update the text color to ensure good contrast against the primary color
          setContrastCoverPalette(textColor);
        })
        .catch(console.error); // Log any errors that occur during the color extraction process
    }
  }, [track]);

  return (
    <Drawer>
      <DrawerTrigger>
        <Card
          className="
          w-72
              cursor-pointer
              group
              relative
              overflow-hidden
              before:content-[''] 
              before:inset-0
              before:absolute
              before:hover:bg-gradient-to-b from-secondary/80 from-40% to-transparent
    "
        >
          <CardHeader className="w-72 group-hover:visible invisible absolute">
            <CardTitle className="truncate">{track.track.album.name}</CardTitle>
            <CardDescription>{tt('see_more')} </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              id={track.track.album.id}
              className="rounded-lg"
              alt={`Album cover for ${track.track.album.name}`}
              src={track.track.album.images[0].url}
              width={320}
              height={320}
            />
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent
        className="flex flex-col items-center py-8 backdrop-blur-[10px] px-2 md:p-0"
        style={{
          color: contrastCoverPalette,
          background: `color-mix(in srgb, ${coverPalette}7f 80%, ${contrastCoverPalette})`, // the 7f at the end of the cover palette is to add 50% of opacity
        }}
      >
        <DrawerHeader className="">
          <DrawerTitle>{track.track.album.name}</DrawerTitle>
          <DrawerDescription style={{ color: contrastCoverPalette }}>
            <div className="flex gap-2">
              {track.track.artists.map((ar, index) => {
                return (
                  <span key={index}>
                    <Link
                      href={ar.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {ar.name}
                    </Link>
                    {index < track.track.artists.length - 1 && ", "}
                  </span>
                );
              })}
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <Card id="cardTrack" style={{background: `color-mix(in srgb, ${coverPalette}7f 80%, ${contrastCoverPalette})`, }}>
          <CardContent className="p-0">
            <Image
              className="rounded-lg"
              alt={`Album cover for ${track.track.album.name}`}
              src={track.track.album.images[0].url}
              width={track.track.album.images[0].width}
              height={track.track.album.images[0].height}
            />
          </CardContent>
        </Card>
        <DrawerFooter>
          {
            <Link
              className={buttonVariants({ variant: "default" })}
              href={track.track?.album?.uri}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt className="mr-2 h-4 w-4" />
              {tt('listen')}
            </Link>
          }
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const TrackList = ({ tracks }: { tracks: TrackType[] }) => {
  return (
    <div className="flex gap-4 flex-wrap justify-center items-center">
      {tracks.map((track, ind) => (
        <TrackItem track={track} key={ind} />
      ))}
    </div>
  );
};

export default TrackList;
