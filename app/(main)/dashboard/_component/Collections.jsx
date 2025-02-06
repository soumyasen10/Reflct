"use client"

import { useEffect, useState } from "react"
import CollectionPreview from "./CollectionPreview"
import CollectionForm from "@/components/CollectionForm"
import { createCollection, getCollections } from "@/actions/collection"
import { toast } from "sonner"
import useFetch from "@/hooks/useFetch"

const Collections = ({collections=[],entriesBycollection}) => {
    const [isDialogOpen,setIsDialogOpen]=useState(false)

    const {data:createCollectionData,loading:createCollectionLoading,fn:createCollectionDatafn}=useFetch(createCollection)

    const {data:collectionData,loading:collectionLoading,fn:getCollectionfn}=useFetch(getCollections)

    useEffect(() => {
        if (createCollectionData) {
          setIsDialogOpen(false);
          getCollectionfn();
          toast.success(`Collection ${createCollectionData?.name} created!`);
        }
      }, [createCollectionData]);

    const handleCreateCollection=async(data)=>{
        createCollectionDatafn(data);
    }


    if(collections.length === 0) return <></>
  return (
   <section id="collection" className="space-y-6">
    <h2 className="text-3xl font-bold gradient-title">Colections</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CollectionPreview
        isCreatedNew={true}
        oncreateNew={()=>setIsDialogOpen(true)}
        />

        {entriesBycollection.unorganized?.length > 0 && (
            <CollectionPreview
            name="Unorganized"
            isUnorganized={true}
            entries={entriesBycollection.unorganized}
            />
        )}

        {collections.map((collection)=>{
            return <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.name}
            entries={entriesBycollection[collection.id] || []}
            />
        })}

<CollectionForm loading={createCollectionLoading} onsuccess={handleCreateCollection} open={isDialogOpen} setOpen={setIsDialogOpen}/>
    </div>
   </section>
  )
}

export default Collections