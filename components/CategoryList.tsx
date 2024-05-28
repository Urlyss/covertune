import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
import useLocalStorage from "use-local-storage";
import { Link } from '@/navigation';

type CategoryType = {
    href:string,
    id:string,
    icons:{
      url:string,
      width:number,
      height:number
    }[],
    name:string
}


const CategoryItem =  ({category}:{category:CategoryType}) => {
  
  const [currentCategory, setCurrentCategory] = useLocalStorage("current_category", "");
  return (
    <Link href={`/categories/${category.id}`} onClick={()=>setCurrentCategory(category.name)}>
      <Card id="cardTrack" className="
      w-60
      cursor-pointer
      group
    relative
    overflow-hidden
    before:content-[''] 
    before:inset-0
    before:absolute
    before:bg-gradient-to-b from-secondary/50 from-40% to-transparent
      ">
        <CardHeader id="cardTrackHeader" className="w-60 absolute">
          <CardTitle className='truncate'>
          {category.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Image
          className="rounded-lg"
            alt={`Category icon for ${category.name}`}
            src={category.icons[0].url}
            width={320}
            height={320}
          />
        </CardContent>
      </Card>
    </Link>
  )
}


const CategoryList = ({categories}:{categories:CategoryType[]}) => {
  return (
    <div className='flex flex-wrap justify-center gap-20'>
        {categories.map((category,ind) =><CategoryItem category={category} key={ind}/>)}
    </div>
  )
}

export default CategoryList