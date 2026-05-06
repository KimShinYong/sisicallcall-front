export const endpoints = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
  },

  dashboardOverview: "/dashboard/overview",
  escalationAlerts: "/dashboard/escalation-alerts",
  dashboardStats: "/dashboard/stats",
  dashboardPriorityQueue: "/dashboard/priority-queue",
  dashboardEmotionDistribution: "/dashboard/emotion-distribution",

  callList: "/call",
  callDetail: (callId: string) => `/call/${callId}`,
  callTranscripts: (callId: string) => `/call/${callId}/transcripts`,

  callSummary: (callId: string) => `/summary/${callId}`,

  tenants: "/tenants",
  tenantDocuments: (tenantId: string) => `/tenants/${tenantId}/documents`,
} as const
