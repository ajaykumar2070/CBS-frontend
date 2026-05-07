'use client'
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { ContentInputTypes, contentSchema } from "@/lib/validations";
import { uploadContent } from "@/services/content.service";
import { queryclient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthProvider";
import { Spinner } from "@/components/ui/spinner";

export default function UploadContentPage() {
    const {user}= useAuth()
    if(!user) return;
    const [preview, setPreview] = useState<string | null>(null);
    const { register, handleSubmit, control, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ContentInputTypes>({
        resolver: zodResolver(contentSchema),
        mode: "all"
    })

    const { mutate: onuploadContent, isPending } = useMutation({
        mutationKey: ['upload-content'],
        mutationFn: (data: ContentInputTypes) => uploadContent(data, user.id),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ['teacher-content'] })
        },
        onError: (error) => { console.log(error) }
    })

    const onSubmit = (data: ContentInputTypes) => {
        console.log(data)
        onuploadContent(data)
    }
    return (
        <section>
            <h2 className="text-2xl font-bold">Upload Content</h2>
            <div className="w-lg mx-auto border p-4 rounded-2xl shadow mt-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <p className="text-sm font-bold">Title*</p>
                            <Input {...register("title")} placeholder="Enter title" />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                            <p className="text-sm font-bold">Subject*</p>

                            <Controller
                                control={control}
                                name="subject"
                                render={({ field }) => (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full rounded-md bg-white">
                                            <SelectValue placeholder="Subject" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="math">Math</SelectItem>
                                                <SelectItem value="science">Science</SelectItem>
                                                <SelectItem value="english">English</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <p className="text-sm font-bold">Description</p>
                        <Textarea {...register("description")} placeholder="Enter description" />
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                        <p className="text-sm font-bold">Upload File*</p>
                        <Input
                            type="file"
                            {...register("file")}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                        />
                        {errors.file && <p className="text-red-500 text-sm">{errors.file.message as string}</p>}

                        {/* Preview */}
                        {preview && (
                            <Image src={preview} alt="preview" height={100} width={100} className="mt-2 h-32 w-50 object-cover rounded" />
                        )}
                    </div>

                    {/* Start Time */}
                    <div className="space-y-2">
                        <p className="text-sm font-bold">Start Time*</p>
                        <Input type="datetime-local" {...register("startTime")} />
                        {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime.message}</p>}
                    </div>

                    {/* End Time */}
                    <div className="space-y-2">
                        <p className="text-sm font-bold">End Time*</p>
                        <Input type="datetime-local" {...register("endTime")} />
                        {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}
                    </div>

                    {/* Rotation Duration */}
                    <div className="space-y-2">
                        <p className="text-sm font-bold">Rotation Duration (seconds)</p>
                        <Input type="number" {...register("rotationDuration")} placeholder="e.g. 10" />
                    </div>

                    {/* Submit */}
                    <div className="w-fit mx-auto text-center">
                        <Button
                            type="submit"
                            className="w-fit"
                            disabled={isPending || isSubmitting}
                        >
                            Upload Content
                            {isPending || isSubmitting && <Spinner/>}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    )
}