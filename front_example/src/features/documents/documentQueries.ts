import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  deleteTenantDocument,
  getTenantDocuments,
  uploadTenantDocument,
} from "@/features/documents/documentApi"
import type { TenantDocumentsParams } from "@/features/documents/documentTypes"

export const tenantDocumentQueryKeys = {
  all: ["tenant-documents"] as const,
  lists: () => [...tenantDocumentQueryKeys.all, "list"] as const,
  list: (tenantId: string | null | undefined, params?: TenantDocumentsParams) =>
    [...tenantDocumentQueryKeys.lists(), tenantId ?? "unknown", params] as const,
  listScope: (tenantId: string | null | undefined) =>
    [...tenantDocumentQueryKeys.lists(), tenantId ?? "unknown"] as const,
}

export function useTenantDocuments(
  tenantId: string | null | undefined,
  params?: TenantDocumentsParams,
) {
  return useQuery({
    queryKey: tenantDocumentQueryKeys.list(tenantId, params),
    queryFn: () => getTenantDocuments(tenantId!, params),
    enabled: Boolean(tenantId),
  })
}

export function useUploadTenantDocument(tenantId: string | null | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => {
      if (!tenantId) {
        throw new Error("회사 정보를 확인할 수 없습니다.")
      }

      return uploadTenantDocument(tenantId, file)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: tenantDocumentQueryKeys.listScope(tenantId),
      })
    },
  })
}

export function useDeleteTenantDocument(tenantId: string | null | undefined) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (documentId: string) => {
      if (!tenantId) {
        throw new Error("회사 정보를 확인할 수 없습니다.")
      }

      return deleteTenantDocument(tenantId, documentId)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: tenantDocumentQueryKeys.listScope(tenantId),
      })
    },
  })
}
