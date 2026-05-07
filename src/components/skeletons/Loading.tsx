export default function ContentLoadng() {
    return (
        <>
            {
                Array.from({ length: 10 }).map((_, i) => {
                    return (
                        <div className="py-3 px-4 grid grid-cols-4 text-black/40 border-b font-semibold">
                            <div className="bg-zinc-500/20 rounded-md animate-pulse h-4 w-20" />
                            <div className="bg-zinc-500/20 rounded-md animate-pulse h-4 w-20 mx-auto" />
                            <div className="bg-zinc-500/20 rounded-md animate-pulse h-4 w-20 mx-auto" />
                            <div className="bg-zinc-500/20 rounded-md animate-pulse h-4 w-20 ms-auto" />
                        </div>
                    )
                })
            }
        </>
    )
}