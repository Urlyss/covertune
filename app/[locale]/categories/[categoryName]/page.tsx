import CategoryDetailPage from '@/components/CategoryDetailPage'
import { getAllItemsFromEndpoint, getSpotifyInstance } from '@/lib/utils'
import { Playlist, Track } from '@spotify/web-api-ts-sdk'
import { getLocale } from 'next-intl/server'
import React from 'react'

async function getCategoryPlaylist(categoryName:string){
  const instance = await getSpotifyInstance()
  const locale = await getLocale()
  const country = locale.split('-')[1]
  const categoryPlaylist = instance!= null? await getAllItemsFromEndpoint(
    instance,
    "https://api.spotify.com/v1/search?type=playlist&market="+country+"&q="+categoryName,
    "playlist"
  ) : []
  return categoryPlaylist as Playlist[]
}

async function getCategoryTracks(url:string){
  "use server"
  const instance = await getSpotifyInstance()
  const categoryTracks = instance!= null? await getAllItemsFromEndpoint(
    instance,
    url,
    "tracks"
  ) : []
  return categoryTracks as Track[]
}

const page = async ({ params }: { params: { categoryName: string } }) => {
  let errorPlst = false
  let playlists = await  getCategoryPlaylist(params.categoryName)
  if(typeof playlists == "string"){
    playlists = []
    errorPlst = true
  }
  return (
    <CategoryDetailPage playlists={playlists} errorPlst={errorPlst} getCategoryTracks={getCategoryTracks}/>
  )
}

export default page