import { createBrowserRouter, Navigate } from "react-router-dom"
import { LandingPage } from "@/pages/landing/LandingPage"
import { DashboardLayout } from "@/pages/dashboard/DashboardLayout"
import { DashboardHomePage } from "@/pages/dashboard/DashboardHomePage"
import { CallsPage } from "@/pages/calls/CallsPage"
import { VocPage } from "@/pages/voc/VocPage"
import { KnowledgePage } from "@/pages/knowledge/KnowledgePage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
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
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
])
