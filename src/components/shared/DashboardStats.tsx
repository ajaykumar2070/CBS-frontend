import { getDashboardStats } from "@/services/content.service"
import { useQuery } from "@tanstack/react-query"

interface DashboardStats {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
}
export default function DashboardStats(){
    const { data: dashboardStats, isLoading: statsLoading } = useQuery<DashboardStats>({
        queryKey: ['dashboard-stats'],
        queryFn: () => getDashboardStats(),
    })
    return(
        <>
        {
                dashboardStats &&
                <div className="grid grid-cols-4 gap-4 mt-6">
                    <StatsCard title="Total Uploaded" count={dashboardStats.total} />
                    <StatsCard title="Total Pending" count={dashboardStats.pending} />
                    <StatsCard title="Total Approved" count={dashboardStats.approved} />
                    <StatsCard title="Total Rejected" count={dashboardStats.rejected} />
                </div>
            }
        </>
    )
}

interface StatsCardProps {
    title: string,
    count: number
}
const StatsCard = ({ title, count }: StatsCardProps) => {
    return (
        <div className="bg-background-surface rounded-xl p-6 shadow text-center space-y-2">
            <h2 className="text-xl font-semibold text-zinc-700">{title}</h2>
            <h1 className="text-4xl font-bold">{count}</h1>
        </div>
    )
}