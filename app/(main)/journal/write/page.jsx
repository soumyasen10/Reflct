"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { JournalSchema } from "@/lib/schema";
import { BarLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOODS, getMoodById } from "@/lib/mood";
import { Button } from "@/components/ui/button";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const JournalEntryPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(JournalSchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      collectionId: "",
    },
  });
  const isLoading = false;
  const moodValue = watch("mood");

  const onSubmit=handleSubmit(async(data)=>{
    console.log(data);
  })

  return (
    <div className="py-8">
      <form className="space-y-2 mx-auto" onSubmit={onSubmit}>
        <h1 className="text-5xl md:text-6xl gradient-title" >
          What&apos;s on your mind?
        </h1>
        {isLoading && <BarLoader color="orange" width={"100%"} />}

        <div className="space-y-4">
          <label className="text-sm font-medium">Title</label>
          <Input
          disabled={isLoading}
            {...register("title")}
            placeholder="Give your entry a title..."
            className={`py-5 md:text-md ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            How&apos;re you feeling?
          </label>

          <Controller
            name="mood"
            control={control}
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={errors.mood?"border-red-500 w-[580px]":"w-[580px]"}>
                    <SelectValue placeholder="Select You mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MOODS).map((mood) => {
                      return (
                        <SelectItem key={mood.id} value={mood.id}>
                          <span className="flex items-center gap-2">
                            {mood.emoji} {mood.label}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              );
            }}
          />
           {errors.mood && <p className="text-sm text-red-500">{errors.mood.message}</p>}
        </div>


        <div className="space-y-2">
          <label className="text-sm font-medium">
            {getMoodById(moodValue)?.prompt ?? "write your thoughts..."}
          </label>

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
                <ReactQuill
                readOnly={isLoading}
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                modules={{
                    toolbar:[
                        [{header:[1,2,3,false]}],
                        ["bold","italic","underline","strike"],
                        [{list:"ordered"},{list:"bullet"}],
                        ["blockquote","code-block"],
                        ["link"],
                        ["clean"]
                    ]
                }}
                />
            )}
          />
           {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Add to collection (optional)
          </label>

          {/* <Controller
            name="content"
            control={control}
            render={({ field }) => (
            
            )}
          /> */}
           {errors.collectionId && <p className="text-sm text-red-500">{errors.collectionId.message}</p>}
        </div>

        <div className="spacr-y-4 flex ">
          <Button  type="submit" variant="orange">
          Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JournalEntryPage;
