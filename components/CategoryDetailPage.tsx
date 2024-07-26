"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import useLocalStorage from "use-local-storage";
import TrackList from "./TrackList";
import { Button } from "./ui/button";
import { LucideLoader2 } from "lucide-react";
import { ToastAction } from "./ui/toast";
import { Skeleton } from "./ui/skeleton";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/navigation";
import { Playlist, Track } from "@spotify/web-api-ts-sdk";

const CategoryDetailPage = ({
  playlists,
  errorPlst,
  getCategoryTracks
}: {
  playlists: Playlist[];
  errorPlst: boolean;
  getCategoryTracks:(url: string) => Promise<Track[] | any[]>
}) => {
  const { toast } = useToast();
  const [currentCategory, setCurrentCategory] = useLocalStorage(
    "current_category",
    ""
  );
  const [playlistsTab, setPlaylistsTab] = useState<Playlist[]>(playlists);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loadMore, setLoadMore] = useState(false);
  const [noMoreTracks, setNoMoreTracks] = useState(false);
  const t = useTranslations("CategoryDetail");
  const te = useTranslations("ToastError");
  const router = useRouter();

  useEffect(() => {
    if (playlistsTab && playlistsTab.length > 0) {
      const currPlaylist = playlistsTab.shift();
      setPlaylistsTab(playlistsTab);
      getTrackList(currPlaylist);
    } else {
      if (playlistsTab?.length == 0 && !errorPlst) {
        toast({
          title: te("no_cover_title"),
          action: (
            <ToastAction onClick={() => router.back()} altText="Go Back">
              Go Back
            </ToastAction>
          ),
          duration: 60000,
        });
        return;
      }
    }
  }, []);

  const loadMoreTrack = async () => {
    if (playlistsTab.length > 0) {
      const cpyPlst = [...playlistsTab];
      const currPlaylist = cpyPlst.shift();
      setPlaylistsTab(cpyPlst);
      await getTrackList(currPlaylist, tracks);
    } else {
      setNoMoreTracks(true);
    }
  };

  const getTrackList = async (playlist: any, initTrack: Array<any> = []) => {
    if (playlist && playlist.tracks != null) {
      setLoadMore(true);
      const tracks = await getCategoryTracks(playlist.tracks.href)
      if(typeof tracks == "string"){
        toast({
          variant: "destructive",
          title: te("generic_error_description"),
          action: (
            <ToastAction
              onClick={() => window.location.reload()}
              altText="Try again"
            >
              {te("toast_try_again")}
            </ToastAction>
          ),
          duration:10000
        });
        return;
      }
      if (tracks && tracks.length) {
        //removing duplicate on the tracklist
        const uniqueTrks = tracks.filter(
          (element, index, self) =>
            element.track != null && self.findIndex(
              (otherElement) =>
                otherElement.track != null && otherElement.track.album.name == element.track.album.name
            ) === index
        );
        //make sure to add only non existent tracks
        const existingNames = new Set(
          initTrack.map((element) => element.track?.album.name)
        );
        const uniqueElements = uniqueTrks.filter(
          (element) => !existingNames.has(element.track?.album.name)
        );
        setTracks(initTrack.concat(uniqueElements));
        setLoadMore(false);
      } 
    }
  };

  return (
    <div className="mt-32">
      {tracks.length == 0 && !errorPlst ? (
        <div className="flex gap-4 flex-wrap justify-center items-center">
          {Array(12)
            .fill(1)
            .map((sk, ind) => (
              <Skeleton className="w-72 h-72" key={ind} />
            ))}
        </div>
      ) : errorPlst ? (
        <div className="bg-destructive text-destructive-foreground p-6 flex justify-between rounded-md">
          {te("category_problem_title")}
          <Link
            className="inline-flex h-8 shrink-0 items-center justify-center rounded-md px-3 text-sm font-medium border bg-transparent ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2  border-muted/40 hover:border-destructive/30 hover:bg-destructive hover:text-destructive-foreground focus:ring-destructive"
            href="/categories"
            passHref
          >
            {te("go_back")}
          </Link>
        </div>
      ) : (
        <div>
          {currentCategory.length && (
            <div className="flex justify-center mb-10">
              <h1 className="text-4xl">{`${currentCategory}`}</h1>
            </div>
          )}
          <TrackList tracks={tracks} />
          <div className="flex justify-center my-4">
            {noMoreTracks ? (
              <div>{t("end_of_list")}</div>
            ) : (
              <Button disabled={loadMore} onClick={loadMoreTrack}>
                {loadMore && (
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("see_more")}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetailPage;
