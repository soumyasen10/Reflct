"use client"
import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/useFetch'
import { toast } from 'sonner'
import { deleteJournalEntry } from '@/actions/journal'

const DeleteDialog = ({entryId}) => {
  const router=useRouter();
  const [deleteDialogOpen,setDeleteDialogOpen]=useState(false)

  const {loading:isDeleting,fn:deleteEntryfn,data:deletedEntry}=useFetch(deleteJournalEntry);

  useEffect(()=>{
    if(deletedEntry && !isDeleting){
      setDeleteDialogOpen(false)
      toast.error(`Journal entry deleted successfully!`)
      router.push(`
      /collection/${deletedEntry.collectionId? deletedEntry.collectionId:"unorganized"}`)
    }

  },[deletedEntry,isDeleting])

  const handleDelete=()=>{
    deleteEntryfn({id:entryId})
  }
  return (
    <AlertDialog deleteDialogOpen={deleteDialogOpen} ondeleteDialogOpenChange={setDeleteDialogOpen}>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">
      <Trash2 className='h-4 w-4 '/>
      Delete
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className="text-red-600">Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your journal entry.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <Button onClick={handleDelete} disabled={isDeleting}>{isDeleting?"Deleting...":"Confirm"}</Button>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}

export default DeleteDialog;