"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useLocale, useTranslations } from "next-intl";
import { Skeleton } from "./ui/skeleton";
import useLocalStorage from "use-local-storage";
import { getAllItemsFromEndpoint } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useRouter } from "@/navigation";
import TrackList from "./TrackList";
import { LucideLoader2 } from "lucide-react";
import { SearchBar } from "./SearchBar";

const SearchPage = () => {
  const t = useTranslations('CategoryDetail');
  const ts = useTranslations("SearchPage");
  const te = useTranslations("ToastError");
  const [playlists,setPlaylists] = useState<any[]>([])
  const [accessToken, setAccessToken] = useLocalStorage(
    "covertune_access_token",
    undefined
  );
  const locale = useLocale();
  const [searchText,setSearchText] = useState('')
  const { toast } = useToast();
  const [tracks, setTracks] = useState<any[]>([]);
  const [loadMore, setLoadMore] = useState(false);
  const [noMoreTracks, setNoMoreTracks] = useState(false);
  const router = useRouter()
  const [firstSearch,setFirstSearch] = useState(true)
  const [loading,setLoading] = useState(false)


  useEffect(() => {
    const country = locale.split('-')[1]
    if (accessToken && searchText.length > 3) {
      setLoading(true)
      setFirstSearch(false)
      setTracks([])
      getAllItemsFromEndpoint(
        accessToken,
        "https://api.spotify.com/v1/search?type=playlist&market="+country+"&q="+searchText,
        "playlist"
      ).then((plst) => {
        if (plst && plst.length>1) {
          const currPlaylist = plst.shift();
          setPlaylists(plst);
          getTrackList(currPlaylist);
        } else {
          if(plst?.length == 0){
            toast({
              title: te('no_cover_search'),
            })
            return;
          }
          if(plst?.length == 1 && plst[0].error){
            toast({
              variant: "destructive",
              title: te('search_error'),
            })
            return ;
          }
          setAccessToken(undefined);
        }
      });
    }
  }, [accessToken,locale,searchText]);

  const loadMoreTrack = async () => {
    if (playlists.length > 0) {
      const cpyPlst = [...playlists];
      const currPlaylist = cpyPlst.shift();
      setPlaylists(cpyPlst);
      getTrackList(currPlaylist, tracks);
    } else {
      setNoMoreTracks(true);
    }
  };

  const getTrackList = (playlist: any, initTrack: Array<any> = []) => {
    if (accessToken && playlist && playlist.tracks != null) {
      setLoadMore(true);
      getAllItemsFromEndpoint(accessToken, playlist.tracks.href, "tracks").then(
        (trk) => {
          if (trk && trk.length) {
            //removing duplicate on the tracklist
            const uniqueTrks = trk.filter((element, index, self) => self.findIndex((otherElement) => otherElement.track.album.name == element.track.album.name) === index)
            //make sure to add only non existent tracks
            const existingNames = new Set(initTrack.map(element => element.track.album.name));
            const uniqueElements = uniqueTrks.filter(element => !existingNames.has(element.track.album.name));
            setTracks(initTrack.concat(uniqueElements));
            setLoadMore(false);
            setLoading(false)
          } else {
            if(trk?.length == 0){
              toast({
                variant: "destructive",
                title: te('generic_error_title'),
                description: te('generic_error_description'),
                action: <ToastAction onClick={()=>window.location.reload()} altText="Try again">{te('toast_try_again')}</ToastAction>,
              })
              return;
            }
            setAccessToken(undefined);
          }
        }
      );
    }
  };


function handleInput(txt: string) {
    setSearchText(txt)
}

  return (
    <div className="mt-32 space-y-10">
        <SearchBar submit={handleInput} loading={loading}/>
      {tracks.length == 0 ? (
        <div className="flex gap-4 flex-wrap justify-center items-center">
        {firstSearch?(<div className="mt-20">{ts('initial_search_page')}</div>)
        :
        !loading?(<div className="mt-20">{ts('no_result_search')}</div>):
        Array(12)
          .fill(1)
          .map((sk,ind) => (
            <Skeleton className="w-72 h-72" key={ind}/>
          ))}
      </div>
      ) : (
        <div>
          <TrackList tracks={tracks} />
          <div className="flex justify-center my-4">
            {noMoreTracks ? (
              <div>{t('end_of_list')}</div>
            ) : (
              <Button disabled={loadMore} onClick={loadMoreTrack}>
                {loadMore && (
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t('see_more')}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
