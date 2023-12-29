import { Metadata } from "next"
import StatisticsDetail from "@/components/statistics/statistics-detail"

export const metadata: Metadata = {
  title: "Statistics",
  description: "Statistics",
}

export default function StatisticsPage() {
  return (
    <div className="hidden flex-col md:flex fade-in">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <StatisticsDetail/>
        </div>
    </div>
  )
}