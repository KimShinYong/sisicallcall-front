export const endpoints = {
  dashboardOverview: "/dashboard/overview",
  escalationAlerts: "/dashboard/escalation-alerts",

  calls: "/calls",
  callDetail: (callId: string) => `/calls/${callId}`,
  callTranscripts: (callId: string) => `/calls/${callId}/transcripts`,

  summary: (callId: string) => `/summaries/${callId}`,
  summarySync: (callId: string) => `/summaries/${callId}/sync`,

  voc: (callId: string) => `/voc/${callId}`,
  vocClusters: "/voc/clusters",

  tenants: "/tenants",
  tenantDocuments: (tenantId: string) => `/tenants/${tenantId}/documents`,
} as const
