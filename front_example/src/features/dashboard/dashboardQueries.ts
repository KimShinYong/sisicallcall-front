import { useQuery } from "@tanstack/react-query"
import {
  getDashboardPriorityQueue,
  getDashboardStats,
} from "@/features/dashboard/dashboardApi"

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
  })
}

export function useDashboardPriorityQueue() {
  return useQuery({
    queryKey: ["dashboard", "priority-queue"],
    queryFn: getDashboardPriorityQueue,
  })
}
