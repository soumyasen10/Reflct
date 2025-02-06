import { getJournalEntry } from '@/actions/journal';
import { getMoodById } from '@/lib/mood';
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react'
import DeleteDialog from './_components/DeleteDialog';
import EditButton from './_components/EditButton';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const JournalENtryPage = async({params}) => {
  const {id}=params;
  const entry=await getJournalEntry(id);
  const mood=getMoodById(entry.mood);

  return (
    <>
    {entry.moodImageUrl && (
      <div className='relative h-48 md:h-64 w-full'>
        <Image
        src={entry.moodImageUrl}
        alt="moodImageUrl"
        className='object-cover'
        fill
        priority
        />
      </div>
    )}
      <div className='p-6 space-y-6'>
        <div className='space-y-4'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='space-y-1'>
            <h1 className='text-5xl font-bold gradient-title'>{entry.title}</h1>
            <p className='text-gray-500'>created {format(new Date(entry.createdAt),"PPP")}</p>
            </div>
            <div className='flex items-center gap-2'>
              <EditButton entryId={id}/>
              <DeleteDialog entryId={id}/>
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            {entry.collection && (
              <Link href={`/collection/${entry.id}`}>
                <Badge>Collection: {entry.collection.name}</Badge>
              </Link>
            )}
            <Badge variant="outline"
              style={{
                backgroundColor: `var(--${mood?.color}-50)`,
                color: `var(--${mood?.color}-700)`,
                borderColor: `var(--${mood?.color}-200)`,
              }}>Feeling {mood?.label}</Badge>
          </div>
        </div>
        <hr />
        <div className='ql-snow'>
          <div className='ql-editor' dangerouslySetInnerHTML={{__html:entry.content}}/>
        </div>
      </div>
    </>
  )
}

export default JournalENtryPage