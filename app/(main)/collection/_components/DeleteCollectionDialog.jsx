"use client"
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/useFetch'
import { deleteCollection } from '@/actions/collection'
import { toast } from 'sonner'

const DeleteCollectionDialog = ({collection,entriesCount=0}) => {
  const router=useRouter();
  const [open,setOpen]=useState(false)

  const {loading:isDeleting,fn:deleteCollectionfn,data:deletedCollection}=useFetch(deleteCollection);

  useEffect(()=>{
    if(deletedCollection && !isDeleting){
      setOpen(false)
      toast.error(`collection ${collection.name} and it's entries are deleted!`)
      router.push('/dashboard')
    }

  },[deletedCollection,isDeleting])

  const handleDelete=()=>{
    deleteCollectionfn({ collectionId: collection.id })
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">
      <Trash2 className='h-4 w-4 '/>
      Delete
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="text-red-600">Delete &quot;{collection.name}&quot;?</AlertDialogTitle>
      <div className='space-y-2 text-muted-foreground text-sm'>
        <p>This will permanently delete:</p>
        <ul className='list-disc list-inside'>
          <li>The collection &quot;{collection.name}&quot; </li>
          <li>
            {entriesCount} journal {" "}
            {entriesCount ===1 ?"entry":"entries"}
          </li>
        </ul>
      </div>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <Button onClick={handleDelete} disabled={isDeleting}>{isDeleting?"Deleting...":"Confirm"}</Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeleteCollectionDialog