import CategoryDetailPage from '@/components/CategoryDetailPage'
import { getAllItemsFromEndpoint, getSpotifyInstance } from '@/lib/utils'
import { Playlist, Track } from '@spotify/web-api-ts-sdk'
import React from 'react'

async function getCategoryPlaylist(id:string){
  const instance = await getSpotifyInstance()
  const categoryPlaylist = instance!= null? await getAllItemsFromEndpoint(
    instance,
    `browse/categories/${id}/playlists`,
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

const page = async ({ params }: { params: { id: string } }) => {
  let errorPlst = false
  let playlists = await  getCategoryPlaylist(params.id)
  if(typeof playlists == "string"){
    playlists = []
    errorPlst = true
  }
  return (
    <CategoryDetailPage playlists={playlists} errorPlst={errorPlst} getCategoryTracks={getCategoryTracks}/>
  )
}

export default page