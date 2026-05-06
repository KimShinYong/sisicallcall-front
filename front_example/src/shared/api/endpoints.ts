export const endpoints = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
  },

  dashboardOverview: "/dashboard/overview",
  escalationAlerts: "/dashboard/escalation-alerts",
  dashboardStats: "/dashboard/stats",
  dashboardPriorityQueue: "/dashboard/priority-queue",
  dashboardRecentCalls: "/dashboard/recent-calls",
  dashboardIntentDistribution: "/dashboard/intent-distribution",
  dashboardEmotionDistribution: "/dashboard/emotion-distribution",

  callList: "/call",
  callDetail: (callId: string) => `/call/${callId}`,
  callTranscripts: (callId: string) => `/call/${callId}/transcripts`,

  callSummary: (callId: string) => `/summary/${callId}`,

  tenants: "/tenants",
  tenantDocuments: (tenantId: string) => `/tenant/${tenantId}/documents`,
  tenantDocumentDetail: (tenantId: string, documentId: string) =>
    `/tenant/${tenantId}/documents/${documentId}`,
} as const
