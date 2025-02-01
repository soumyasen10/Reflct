import { getCollections } from '@/actions/collection'
import { getJournalEntries } from '@/actions/journal'
import React from 'react'
import Collections from './_component/Collections'

const Dashboard = async() => {
  const collections=await getCollections()
  const entriesData=await getJournalEntries()

  const entriesBycollection=entriesData?.data.entries.reduce((acc,entry)=>{
    const collectionId=entry.collectionId || "unorganized"
    if(!acc[collectionId]){
      acc[collectionId]=[]
    }
    acc[collectionId].push(entry);
    return acc;
  },{});


  return (
    <div className='px-4 py-8 space-y-8'>
      <section className='space-y-4'>
        Mood Analytics
      </section>
      <Collections
      collections={collections} entriesBycollection={entriesBycollection}/>
    </div>
  )
}

export default Dashboard