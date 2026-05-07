'use client'
import Link from "next/link";

const teachers = [
    {
        id: "teacher-1",
        name: "Rahul Sharma",
        subject: "Mathematics",
    },
];

export default function HomePage() {
    return (
        <>
            {/* hero section */}
            <section className="py-30">
                <div className="max-w-7xl mx-auto grid grid-cols-2 gap-10 items-center">

                    <div className="space-y-6">
                        <h1 className="font-bold text-6xl leading-20">
                            Content Broadcasting System
                        </h1>

                        <p className="text-lg text-zinc-600 leading-relaxed">
                            A modern educational broadcasting platform
                            where teachers upload learning content,
                            principals manage approvals, and students
                            access live educational broadcasts.
                        </p>
                    </div>

                    {/* hero image */}
                    <div className="relative h-112.5 w-full rounded-3xl overflow-hidden shadow-xl bg-background-surface" />
                </div>
            </section>

            {/* teachers */}
            <section className="pb-30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold">Live Teachers</h2>
                        <p className="text-zinc-500 mt-4">
                            Watch live educational broadcasts from teachers
                        </p>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-8">
                        {teachers.map((teacher) => (
                            <div key={teacher.id}>
                                <Link href={`/live/${teacher.id}`}>
                                    <div className="bg-white border border-black/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

                                        {/* content */}
                                        <div className="p-5 space-y-2">

                                            <h3 className="font-semibold text-lg">
                                                {teacher.name}
                                            </h3>

                                            <p className="text-sm text-zinc-500">
                                                {teacher.subject}
                                            </p>

                                            <div className="pt-2">
                                                <span className="text-sm font-medium text-blue-600">
                                                    Watch Live →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}