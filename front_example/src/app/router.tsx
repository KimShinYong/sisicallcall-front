import { createBrowserRouter, Navigate } from "react-router-dom"
import { LoginPage } from "@/features/auth/LoginPage"
import { LandingPage } from "@/pages/landing/LandingPage"
import { DashboardLayout } from "@/pages/dashboard/DashboardLayout"
import { DashboardHomePage } from "@/pages/dashboard/DashboardHomePage"
import { CallsPage } from "@/pages/calls/CallsPage"
import { VocPage } from "@/pages/voc/VocPage"
import { KnowledgePage } from "@/pages/knowledge/KnowledgePage"
import { ProtectedRoute } from "@/shared/auth/ProtectedRoute"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHomePage /> },
          { path: "calls", element: <CallsPage /> },
          { path: "voc", element: <VocPage /> },
          { path: "knowledge", element: <KnowledgePage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
])