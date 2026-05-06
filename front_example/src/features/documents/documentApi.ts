import { apiFetch } from "@/shared/api/client"
import { endpoints } from "@/shared/api/endpoints"
import type {
  ApiResponse,
  DeleteTenantDocumentData,
  TenantDocument,
  TenantDocumentsData,
  TenantDocumentsParams,
  UploadTenantDocumentData,
} from "@/features/documents/documentTypes"

function buildDocumentSearchParams(params: TenantDocumentsParams = {}) {
  const searchParams = new URLSearchParams()

  if (typeof params.offset === "number") {
    searchParams.set("offset", String(params.offset))
  }

  if (typeof params.limit === "number") {
    searchParams.set("limit", String(params.limit))
  }

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ""
}

export async function getTenantDocuments(
  tenantId: string,
  params?: TenantDocumentsParams,
) {
  const response = await apiFetch<ApiResponse<TenantDocumentsData>>(
    `${endpoints.tenantDocuments(tenantId)}${buildDocumentSearchParams(params)}`,
  )

  return response.data
}

export async function getTenantDocument(
  tenantId: string,
  documentId: string,
) {
  const response = await apiFetch<ApiResponse<TenantDocument>>(
    endpoints.tenantDocumentDetail(tenantId, documentId),
  )

  return response.data
}

export async function uploadTenantDocument(tenantId: string, file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await apiFetch<ApiResponse<UploadTenantDocumentData>>(
    endpoints.tenantDocuments(tenantId),
    {
      method: "POST",
      body: formData,
    },
  )

  return response.data
}

export async function deleteTenantDocument(
  tenantId: string,
  documentId: string,
) {
  const response = await apiFetch<ApiResponse<DeleteTenantDocumentData>>(
    endpoints.tenantDocumentDetail(tenantId, documentId),
    {
      method: "DELETE",
    },
  )

  return response.data
}
