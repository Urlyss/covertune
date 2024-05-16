"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import useLocalStorage from "use-local-storage";
import { getAllItemsFromEndpoint } from "@/lib/utils";
import TrackList from "./TrackList";
import { Button } from "./ui/button";
import { LucideLoader2 } from "lucide-react";
import { ToastAction } from "./ui/toast";
import { Skeleton } from "./ui/skeleton";

const CategoryDetailPage = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [accessToken, setAccessToken] = useLocalStorage(
    "covertune_access_token",
    undefined
  );
  const [currentCategory, setCurrentCategory] = useLocalStorage("current_category", "");
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loadMore, setLoadMore] = useState(false);
  const [noMoreTracks, setNoMoreTracks] = useState(false);

  useEffect(() => {
    if (accessToken && playlists.length == 0) {
      getAllItemsFromEndpoint(
        accessToken,
        `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
        "playlist"
      ).then((plst) => {
        if (plst && plst.length) {
          const currPlaylist = plst.shift();
          setPlaylists(plst);
          getTrackList(currPlaylist);
        } else {
          if(plst?.length == 0){
            toast({
              title: "There is no cover album for that category.",
              action: <ToastAction onClick={()=>window.location.replace('/categories')} altText="Go Back">Go Back</ToastAction>,
            })
            return;
          }
          if(plst?.length == 1 && plst[1].error){
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction onClick={()=>window.location.reload()} altText="Try again">Try again</ToastAction>,
            })
            return ;
          }
          setAccessToken(undefined);
        }
      });
    }
  }, [accessToken, id]);


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
            setTracks(initTrack.concat(trk));
            setLoadMore(false);
          } else {
            if(trk?.length == 0){
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction onClick={()=>window.location.reload()} altText="Try again">Try again</ToastAction>,
              })
              return;
            }
            setAccessToken(undefined);
          }
        }
      );
    }
  };

  return (
    <div className="mt-32">
      {tracks.length == 0 ? (
        <div className="flex gap-4 flex-wrap justify-center items-center">
        {Array(12)
          .fill(1)
          .map((sk,ind) => (
            <Skeleton className="w-72 h-72" key={ind}/>
          ))}
      </div>
      ) : (
        <div>
          {currentCategory.length && <div className="flex justify-center mb-10">
            <h1 className="text-4xl">{`${currentCategory}`}</h1>
          </div>}
          <TrackList tracks={tracks} />
          <div className="flex justify-center my-4">
            {noMoreTracks ? (
              <div>End of the list</div>
            ) : (
              <Button disabled={loadMore} onClick={loadMoreTrack}>
                {loadMore && (
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Load More
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetailPage;
