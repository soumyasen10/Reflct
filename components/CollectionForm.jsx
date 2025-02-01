"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { collectionSchema } from '@/lib/schema'
import { BarLoader } from 'react-spinners'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

const CollectionForm = ({open,onsuccess,setOpen, loading}) => {
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:zodResolver(collectionSchema),
        defaultValues:{
            name:"",
            description:""
        }
    })

    const onSubmit=handleSubmit(async(data)=>{
        onsuccess(data)
        setOpen(false)
    })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Collection</DialogTitle>
      </DialogHeader>
      {loading && <BarLoader color='orange' width={'100%'}/>}

      <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-4">
          <label className="text-sm font-medium">Collection Name</label>
          <Input
          disabled={loading}
            {...register("name")}
            placeholder="Give your collection a name..."
            className={`py-5 md:text-md ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Description</label>
          <Textarea
          disabled={loading}
            {...register("description")}
            placeholder="Describe your collection..."
            className={`py-5 md:text-md ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <div className='flex justify-end gap-4'>
            <Button type="button" variant="ghost" onClick={()=>setOpen(false)}>Cancel</Button>
            <Button variant="orange" type="submit">Create Collection</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
  )
}

export default CollectionForm