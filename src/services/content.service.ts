
import { ContentItem } from "@/components/dashboard/TeacherDashboard";
import { fileToBase64 } from "@/lib/utils";
import { ContentInputTypes } from "@/lib/validations";

export async function uploadContent(data: ContentInputTypes, teacherId:string) {

    await new Promise((res) => setTimeout(res, 800));
    const existing = JSON.parse(localStorage.getItem("teacher-content") || "[]");

    const file = data.file[0];

    const imageUrl = await fileToBase64(file);

    const newItem = {
        id: crypto.randomUUID(),
        ...data,
        status: "PENDING",
        createdAt: new Date().toISOString(),
        rejectionReason: '',
        fileUrl: imageUrl,
        teacherId,
    };

    const updated = [newItem, ...existing];
    localStorage.setItem("teacher-content", JSON.stringify(updated));

    return {
        success: true,
        data: newItem,
        message: "Content uploaded successfully",
    };
}


export async function getMyContent() {
    await new Promise((res) => setTimeout(res, 800));
    const data = JSON.parse(localStorage.getItem("teacher-content") || "[]");

    return data;
}

export async function getAllContent() {
    await new Promise((res) => setTimeout(res, 800));
    const data = JSON.parse(localStorage.getItem("teacher-content") || "[]");

    return data;
}

export async function getDashboardStats() {
    await new Promise((res) => setTimeout(res, 1000));

    const content = JSON.parse(
        localStorage.getItem("teacher-content") || "[]"
    );

    return {
        total: content.length,
        pending: content.filter((i: ContentItem) => i.status === "PENDING").length,
        approved: content.filter((i: ContentItem) => i.status === "APPROVED").length,
        rejected: content.filter((i: ContentItem) => i.status === "REJECTED").length,
    };
}

// remove content
export async function removeContent(contentId: string) {
    await new Promise((res) => setTimeout(res, 1000));

    const existingContent: ContentItem[] = JSON.parse(
        localStorage.getItem("teacher-content") || "[]"
    );
    const contentExists = existingContent.some(
        (item) => item.id === contentId
    );

    if (!contentExists) {
        throw new Error("Content not found");
    }
    const updatedContent = existingContent.filter(
        (item) => item.id !== contentId
    );
    localStorage.setItem(
        "teacher-content",
        JSON.stringify(updatedContent)
    );

    return {
        success: true,
        message: "Content removed successfully",
    };
}