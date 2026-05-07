'use client'

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/components/dashboard/TeacherDashboard";

export default function LiveTeacherPage() {
  const params = useParams();
  const teacherId = params.teacherId
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);

        // simulate api delay
        await new Promise((res) => setTimeout(res, 1000));

        const storedContent: ContentItem[] = JSON.parse(
          localStorage.getItem("teacher-content") || "[]"
        );

        const now = new Date();

        // only approved + active content
        const activeContent = storedContent.filter((item) => {
          const start = new Date(item.startTime);
          const end = new Date(item.endTime);

          return (
            item.teacherId === teacherId &&
            item.status === "APPROVED" &&
            now >= start &&
            now <= end
          );
        });

        setContent(activeContent);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [teacherId]);

  // auto rotation
  useEffect(() => {
    if (content.length <= 1) return;

    const current =
      content[currentIndex];

    const duration =
      Number(current.rotationDuration) || 10;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === content.length - 1
          ? 0
          : prev + 1
      );
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [content, currentIndex]);

  const currentContent = useMemo(
    () => content[currentIndex],
    [content, currentIndex]
  );

  // loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-zinc-500">
          Loading live content...
        </p>
      </div>
    );
  }

  // empty state
  if (!content.length) {
    return (
      <div className="flex items-center justify-center mt-20">
        <div className="text-center space-y-2 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold">
            No content available
          </h2>

          <p className="text-zinc-500">
            There is currently no active broadcast.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="  w-full">
        {/* content details */}
        <div className=" w-full space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {currentContent.subject}
            </Badge>
            <Badge className="bg-red-500">Live</Badge>
          </div>

          <h1 className="text-5xl font-bold">
            {currentContent.title}
          </h1>

          {currentContent.description && (
            <p className="max-w-3xl text-zinc-800 text-lg">
              {currentContent.description}
            </p>
          )}
        </div>

        <Image
          src={currentContent.fileUrl}
          alt={currentContent.title}
          priority
          height={400}
          width={500}
          className="rounded-md h-200 w-full mt-10"
        />
      </div>
    </div>
  );
}