import { ContentItem } from "@/components/dashboard/TeacherDashboard";
import { api } from "@/lib/api";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export async function rejectContent(contentId: string, reason: string) {
    await delay(2000);
    const existingContent = JSON.parse(
        localStorage.getItem("teacher-content") || "[]"
    );

    const updatedContent = existingContent.map((item: ContentItem) => {
        if (item.id === contentId) {
            return {
                ...item,
                status: "REJECTED",
                rejectionReason: reason,
            };
        }

        return item;
    });

    localStorage.setItem(
        "teacher-content",
        JSON.stringify(updatedContent)
    );

    return {
        success: true,
        message: "Content rejected successfully",
    };
}

export async function approveContent(contentId: string) {
    await delay(2000);
    const existingContent = JSON.parse(
        localStorage.getItem("teacher-content") || "[]"
    );
    const updatedContent = existingContent.map((item: ContentItem) => {
        if (item.id === contentId) {
            return {
                ...item,
                status: "APPROVED",
            };
        }

        return item;
    });

    localStorage.setItem(
        "teacher-content",
        JSON.stringify(updatedContent)
    );

    return {
        success: true,
        data: {
            id: contentId,
            status: "APPROVED",
        },
        message: "Content approved successfully",
    };
}