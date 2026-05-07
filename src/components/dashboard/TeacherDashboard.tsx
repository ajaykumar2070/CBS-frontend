'use client'
import { useQuery } from "@tanstack/react-query"
import { Badge } from "../ui/badge"
import { getMyContent } from "@/services/content.service"
import RemoveModal from "../modal/RemoveModal"
import DashboardStats from "../shared/DashboardStats"
import PreviewModal from "../modal/PreviewModal"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { HugeiconsIcon } from "@hugeicons/react"
import { InformationCircleIcon } from "@hugeicons/core-free-icons"
import ContentLoadng from "../skeletons/Loading"
export interface ContentItem {
    id: string;
    title: string;
    subject: string;
    description?: string;
    startTime: string;
    endTime: string;
    rotationDuration?: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    file: {
        0: File;
    };
    rejectionReason?: string;
    fileUrl: string
    teacherId: String
}

export default function TeacherDashboard() {
    const { data: myContent = [], isLoading } = useQuery<ContentItem[]>({
        queryKey: ['teacher-content'],
        queryFn: () => getMyContent(),
    })
    console.log(myContent)
    return (
        <>
            {/* stats card */}
            <DashboardStats />

            <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">My Uploads:</h2>
                </div>
                <div className="p-2 px-4 grid grid-cols-5 text-zinc-500 border-b">
                    <p>Title</p>
                    <p className="text-center">Subject</p>
                    <p className="text-center">Description</p>
                    <p className="text-center">Status</p>
                    <p className="text-end">Actions</p>
                </div>
                {/* content row */}
                <div>
                    {
                        isLoading ? <ContentLoadng />
                            :
                            (
                                myContent.length === 0 ?
                                    <div className="py-3 border rounded-2xl shadow ">
                                        <h2 className="opacity-50 text-2xl text-center font-bold py-3">No Content Available</h2>
                                    </div>
                                    :
                                    (
                                        myContent.map((content, i) => {
                                            const badgeVariant = content.status === 'APPROVED' ? 'success' : content.status === 'PENDING' ? 'warning' : 'error'
                                            const description = content.description ? content.description.slice(0, 20) + '...' : ''
                                            return (
                                                <div key={content.id} className="border-b border-black/5 py-2 px-2 grid grid-cols-5 text-sm items-center hover:bg-black/4 transition-all duration-300">
                                                    <p className="font-semibold">{content.title}</p>
                                                    <p className="text-center">{content.subject}</p>
                                                    <p className="text-center">{description}</p>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Badge variant={badgeVariant}>{content.status}</Badge>
                                                        {
                                                            content.status === 'REJECTED' &&
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <HugeiconsIcon icon={InformationCircleIcon} size={16} />
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-80">
                                                                    <div className="space-y-2">
                                                                        <h3 className="font-semibold text-sm">
                                                                            Rejection Reason
                                                                        </h3>
                                                                        <p className="text-sm text-zinc-600">
                                                                            {content.rejectionReason || "No reason provided"}
                                                                        </p>
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        }
                                                    </div>
                                                    <div className="flex items-center justify-end gap-2">
                                                        {
                                                            content.status === 'PENDING' &&
                                                            <RemoveModal contentId={content.id} />
                                                        }
                                                        <PreviewModal content={content} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                            )
                    }

                </div>
            </div>
        </>
    )
}