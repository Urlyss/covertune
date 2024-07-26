"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {  useTranslations } from "next-intl";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { Link, useRouter } from "@/navigation";
import TrackList from "./TrackList";
import { LucideLoader2 } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { Playlist, Track } from "@spotify/web-api-ts-sdk";

const SearchPage = ({
  searchPlaylist,
  getPlaylistTracks,
}: {
  searchPlaylist:(searchText: string) => Promise<Playlist[]>
  getPlaylistTracks: (url: string) => Promise<Track[] | any[]>;
}) => {
  const t = useTranslations("CategoryDetail");
  const ts = useTranslations("SearchPage");
  const te = useTranslations("ToastError");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { toast } = useToast();
  const [tracks, setTracks] = useState<any[]>([]);
  const [loadMore, setLoadMore] = useState(false);
  const [noMoreTracks, setNoMoreTracks] = useState(false);
  const router = useRouter();
  const [firstSearch, setFirstSearch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchText,setSearchText] = useState("")
  const [errorPlst,setErrorPlst] = useState(false)


  useEffect(()=>{
    if(searchText.length > 3){
      setLoading(true);
      setFirstSearch(false);
      setTracks([]);
      searchPlaylist(searchText).then((plst)=>{
        if(typeof plst == "string"){
          setErrorPlst(true)
          return;
        }
        if (plst && plst.length > 0) {
          const currPlaylist = plst.shift();
          setPlaylists(plst);
          getTrackList(currPlaylist);
        } else {
          if (playlists?.length == 0) {
            toast({
              title: te("no_cover_title"),
              action: (
                <ToastAction onClick={() => router.back()} altText="Go Back">
                  {te("go_back")}
                </ToastAction>
              ),
              duration: 60000,
            });
            return;
          }
        }
      })
    }
  },[searchText])  

  const loadMoreTrack = async () => {
    if (playlists.length > 0) {
      const cpyPlst = [...playlists];
      const currPlaylist = cpyPlst.shift();
      setPlaylists(cpyPlst);
      await getTrackList(currPlaylist, tracks);
    } else {
      setNoMoreTracks(true);
    }
  };

  const getTrackList = async (playlist: any, initTrack: Array<any> = []) => {
    if (playlist && playlist.tracks != null) {
      setLoadMore(true);
      const tracks = await getPlaylistTracks(playlist.tracks.href)
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
        setLoading(false)
    }
  };
}

  function handleInput(txt: string) {
    setSearchText(txt)
  }

  return (
    <div className="mt-32 space-y-10">
      <SearchBar submit={handleInput} loading={loading} />
      {tracks.length == 0 && !errorPlst ? (
        <div className="flex gap-4 flex-wrap justify-center items-center">
          {firstSearch ? (
            <div className="mt-20">{ts("initial_search_page")}</div>
          ) : !loading ? (
            <div className="mt-20">{ts("no_result_search")}</div>
          ) : (
            Array(12)
              .fill(1)
              .map((sk, ind) => <Skeleton className="w-72 h-72" key={ind} />)
          )}
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
}

export default SearchPage;
