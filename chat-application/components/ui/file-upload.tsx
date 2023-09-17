"use client"

import { X } from "lucide-react"
import Image from "next/image"

import { UploadDropzone } from "@/lib/uploadthing"

import "@uploadthing/react/styles.css"

// endpoints need to be like in the app/api/uploadthing 
interface FileUploadProps {
    onChange: (url?: String) => void
    value: string
    endpoint: "messageFile" | "serverImage"
}

// Uploading the file, using an component to do so, uploadDropzone
// Pass the props from the above interface, and upload the result on the uploadthing website

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {

    // extracting the file type and if its an image we want to see the image we uploaded
    const fileType = value?.split(".").pop()

    if (value && fileType !=="pdf")
    {
        return(
            <div className="relative h-20 w-20">
                <Image 
                    fill
                    src = {value}
                    alt = "Upload"
                    className="rounded-full"
                    />
                    <button
                        onClick = {() => onChange("")}
                        className="bg-rose-500 text-white p-1
                        rounded-full absolute top-0 right-0 shadow-sm"
                        type = "button">
                        < X className="h-4 w-4" />
                    </button>


            </div>
        )
    }
    return (
       <UploadDropzone
         endpoint = {endpoint}
         onClientUploadComplete = {(res) => {
           onChange(res?.[0].url) 
         }}

         onUploadError = {(error: Error) =>{
            console.log(error)  
        }}
         />
       

    )
}