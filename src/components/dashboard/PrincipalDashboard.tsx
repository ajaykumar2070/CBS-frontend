'use client'
import { Badge } from "../ui/badge"
import RejectModal from "../modal/RejectModal"
import ApproveModal from "../modal/ApproveModal"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ContentItem } from "./TeacherDashboard"
import { getAllContent } from "@/services/content.service"
import DashboardStats from "../shared/DashboardStats"
import PreviewModal from "../modal/PreviewModal"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { HugeiconsIcon } from "@hugeicons/react"
import { InformationCircleIcon } from "@hugeicons/core-free-icons"
import ContentLoadng from "../skeletons/Loading"

export default function PrincipalDashboard() {
    const [status, setStatus] = useState('all')

    const { data: AllContent = [], isLoading } = useQuery<ContentItem[]>({
        queryKey: ['all-content'],
        queryFn: () => getAllContent(),
    })

    const filtered = AllContent.filter((f) =>
        status !== 'all'
            ? f.status.toLocaleLowerCase() === status
            : AllContent
    )

    return (
        <>
            {/* stats card */}
            <DashboardStats />

            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Content</h2>
                    <Select value={status} onValueChange={(value) => setStatus(value)}>
                        <SelectTrigger className="w-45">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="py-3 px-4 grid grid-cols-4 text-black/40 border-b font-semibold">
                        <p>Title</p>
                        <p className="text-center">Subject</p>
                        <p className="text-center">Status</p>
                        <p className="text-end">Actions</p>
                    </div>

                    {
                        isLoading ? <ContentLoadng />
                            :
                            (
                                filtered.map((content, i) => {
                                    const badgeVariant = content.status === 'APPROVED' ? 'success' : content.status === 'PENDING' ? 'warning' : 'error'
                                    return (
                                        <div key={content.id} className="border-b border-dashed border-black/30 py-3 px-4 grid grid-cols-4 text-sm items-center hover:bg-black/4 transition-all duration-300">
                                            <p>{content.title}</p>
                                            <p className="text-center">{content.subject}</p>
                                            <div className="flex items-center gap-2 justify-center">
                                                <Badge variant={badgeVariant} >{content.status}</Badge>
                                                {
                                                    content.status === 'REJECTED' &&
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <HugeiconsIcon icon={InformationCircleIcon} size={16} />
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-72">
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
                                            <div className="flex items-center justify-end gap-4">
                                                {
                                                    content.status === 'PENDING' ?
                                                        <>
                                                            <ApproveModal contentId={content.id} />
                                                            <RejectModal contentId={content.id} />
                                                        </>
                                                        :
                                                        <PreviewModal content={content} />
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            )
                    }
                </div>
            </div>
        </>
    )
}
