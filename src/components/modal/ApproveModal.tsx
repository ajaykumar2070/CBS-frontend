'use client'
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { approveContent } from "@/services/approval.service";
import { queryclient } from "@/lib/query-client";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
interface ApproveModalProps {
    contentId: string
}
export default function ApproveModal({ contentId }: ApproveModalProps) {
    const { mutate: approve, isPending } = useMutation({
        mutationKey: ['approve-content'],
        mutationFn: () => approveContent(contentId),
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
                <Button size="sm" className="bg-green-600">Approve</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Approve Content</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="ghost">Cancel</Button>
                    <Button onClick={() => approve()} disabled={isPending}>
                        Confirm
                        {isPending && <Spinner/>}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}