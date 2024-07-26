import SearchPage from '@/components/SearchPage'
import { getAllItemsFromEndpoint, getSpotifyInstance } from '@/lib/utils'
import { Playlist, Track } from '@spotify/web-api-ts-sdk'
import { getLocale } from 'next-intl/server'
import React from 'react'

async function searchPlaylist(searchText:string){
  "use server"
  const instance = await getSpotifyInstance()
  const locale = await getLocale()
  const country = locale.split('-')[1]
  const categoryTracks = instance!= null? await getAllItemsFromEndpoint(
    instance,
    "https://api.spotify.com/v1/search?type=playlist&market="+country+"&q="+searchText,
    "playlist"
  ) : []
  return categoryTracks as Playlist[]
}

async function getPlaylistTracks(url:string){
  "use server"
  const instance = await getSpotifyInstance()
  const categoryTracks = instance!= null? await getAllItemsFromEndpoint(
    instance,
    url,
    "tracks"
  ) : []
  return categoryTracks as Track[]
}

const page = () => {
  return (
    <SearchPage searchPlaylist={searchPlaylist} getPlaylistTracks={getPlaylistTracks}/>
  )
}

export default page