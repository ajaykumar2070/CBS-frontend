'use client'

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ContentItem } from "../dashboard/TeacherDashboard";

interface PreviewModalProps {
content:ContentItem
}

export default function PreviewModal({content}: PreviewModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{content.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          {/* image preview */}
          <div className="relative h-50 w-full overflow-hidden rounded-xl border">
            <Image
              src={content.fileUrl}
              alt={content.title}
              fill
              className="object-cover"
            />
          </div>

          {/* details */}
          <div className="space-y-2">
            <p className="text-lg text-zinc-500 ">
              Subject:{" "}
              <span className="font-medium text-black">
                {content.subject}
              </span>
            </p>

            {content.description && (
              <p className="text-zinc-600">
                {content.description}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}