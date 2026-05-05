export type DashboardStatsResponse = {
  total_calls: number
  resolved_count: number
  escalated_count: number
  action_required_count: number
  mcp_success_count: number
  mcp_failed_count: number
  partial_success_count: number
}

export type DashboardOverview = {
  totalCalls: number
  resolvedCount: number
  resolvedRate: number
  escalationCount: number
  actionRequiredCount: number
  mcpSuccessCount: number
  mcpFailedCount: number
  partialSuccessCount: number
}

export type PriorityQueueItem = {
  id?: string
  call_id?: string
  caller_number?: string
  reason?: string
  priority?: string
  created_at?: string
  [key: string]: unknown
}

export type DashboardAlert = {
  id: string
  callId: string
  callerNumber: string
  reason: string
  priority: string
  createdAt: string
}
