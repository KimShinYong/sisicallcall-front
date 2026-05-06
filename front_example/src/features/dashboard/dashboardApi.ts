import { apiFetch } from "@/shared/api/client"
import { endpoints } from "@/shared/api/endpoints"
import {
  normalizeDashboardStats,
  normalizePriorityQueue,
} from "@/features/dashboard/dashboardAdapters"
import type {
  DashboardStatsResponse,
  PriorityQueueItem,
} from "@/features/dashboard/dashboardTypes"

export async function getDashboardStats() {
  const response = await apiFetch<DashboardStatsResponse>(
    endpoints.dashboardStats,
  )

  return normalizeDashboardStats(response)
}

export async function getDashboardPriorityQueue() {
  const response = await apiFetch<PriorityQueueItem[]>(
    endpoints.dashboardPriorityQueue,
  )

  return normalizePriorityQueue(Array.isArray(response) ? response : [])
}
