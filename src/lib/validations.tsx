import z from "zod";

export const contentSchema = z.object({
    title: z.string().min(1, "Title is required"),
    subject: z.string().min(1, "Subject is required"),
    description: z.string().optional(),
    file: z
        .any()
        .refine((file) => file?.length === 1, "File is required")
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/gif"].includes(file?.[0]?.type),
            "Only JPG, PNG, GIF allowed"
        )
        .refine(
            (file) => file?.[0]?.size <= 10 * 1024 * 1024,
            "Max file size is 10MB"
        ),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    rotationDuration: z.string().optional(),
}).refine((data) => data.endTime > data.startTime, {
    message: "End time must be greater than start time",
    path: ["endTime"],
});

export type ContentInputTypes = z.infer<typeof contentSchema>