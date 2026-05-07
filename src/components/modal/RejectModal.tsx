'use client'
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { rejectContent } from "@/services/approval.service";
import { queryclient } from "@/lib/query-client";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
interface RejectModalProps {
    contentId: string
}
export default function RejectModal({ contentId }: RejectModalProps) {
    const [reason, setReason] = useState('')
    const { mutate: reject, isPending } = useMutation({
        mutationKey: ['reject-content'],
        mutationFn: () => rejectContent(contentId, reason),
        onSuccess: async() => {
            await Promise.all([
                queryclient.invalidateQueries({ queryKey: ['all-content'] }),
                queryclient.invalidateQueries({ queryKey: ['dashboard-stats'] })
            ])
        },
        onError: (error) => { console.log(error) }
    })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="bg-red-600">Reject</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Reject Content</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <h4 className="text-sm font-bold">Why do you want to reject content?*</h4>
                    <Textarea placeholder="Enter reason here" value={reason} onChange={(e) => setReason(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="ghost">Cancel</Button>
                    <Button onClick={() => reject()} disabled={isPending || !reason}  className="bg-red-500">
                        Confirm
                        {isPending && <Spinner/>}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}