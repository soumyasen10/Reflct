"use client"

import { Button } from '@/components/ui/button'
import { Edit2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const EditButton = ({entryId}) => {
  const router=useRouter()
  return (
   <Button
   variant="outline"
   onClick={()=>router.push(`/journal/write?edit=${entryId}`)}
   >
    <Edit2 className='h-4 w-4'/>
    Edit
   </Button>
  )
}

export default EditButton