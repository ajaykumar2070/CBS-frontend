'use client'
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { queryclient } from "@/lib/query-client";
import { Spinner } from "../ui/spinner";
import { removeContent } from "@/services/content.service";
interface RemoveModalProps {
    contentId: string
}
export default function RemoveModal({ contentId }: RemoveModalProps) {
    const { mutate: remove, isPending } = useMutation({
        mutationKey: ['remove-content'],
        mutationFn: () => removeContent(contentId),
        onSuccess: async () => {
            await Promise.all([
                queryclient.invalidateQueries({ queryKey: ['teacher-content'] }),
                queryclient.invalidateQueries({ queryKey: ['dashboard-stats'] })
            ])
        },
        onError: (error) => { console.log(error) }
    })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="bg-red-600">Remove</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Remove Content</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="ghost">Cancel</Button>
                    <Button
                        onClick={() => remove()}
                        disabled={isPending}
                        className="bg-red-500"
                    >
                        Confirm
                        {isPending && <Spinner />}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}