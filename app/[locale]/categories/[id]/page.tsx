import CategoryDetailPage from '@/components/CategoryDetailPage'
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <CategoryDetailPage id={params.id}/>
  )
}

export default page