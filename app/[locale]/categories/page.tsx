import CategoriesPage from '@/components/CategoriesPage'
import { getAllItemsFromEndpoint, getSpotifyInstance } from '@/lib/utils'
import { Category } from '@spotify/web-api-ts-sdk'
import { getLocale } from 'next-intl/server'
import React from 'react'

async function getCategories(){
  const instance = await getSpotifyInstance()
  const locale = await getLocale()
  const categories = instance!= null? await getAllItemsFromEndpoint(
    instance,
    "browse/categories?locale="+locale,
    "categories"
  ) : []
  return categories as Category[]
}

const page = async () => {
  let categories = await getCategories()
  let error = false
  if(typeof categories == "string"){
    categories = []
    error = true
  }
  return (
    <CategoriesPage categories={categories} error={error}/>
  )
}

export default page