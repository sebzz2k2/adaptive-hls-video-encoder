"use client"

import { ColumnDef } from "@tanstack/react-table"

export type DashboardCols = {
    id: string
    name: string
    size: number,
    uploadTime: string,
    status: "pending" | "processing" | "success" | "failed"
}

export const columns: ColumnDef<DashboardCols>[] = [
    {
        accessorKey: "name",
        header: "Video name",
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("size"))
            let formatted = amount + " KB"
            if (amount >= 1024) {
                formatted = (amount / 1024).toFixed(2) + " MB"
                if (amount / 1024 >= 1024) {
                    formatted = (amount / (1024 * 1024)).toFixed(2) + " GB"
                }
            }
        return <span>{formatted}</span>
        },
    },
    {
        accessorKey: "uploadTime",
        header: "Upload Time",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status: string = row.getValue("status")
            const statusColor = {
                pending: "text-yellow-600",
                processing: "text-gray-500",
                success: "text-green-600",
                failed: "text-red-600",
            }[status] || "text-gray-600"

            const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1)

            return <span className={statusColor}>{capitalizedStatus}</span>
        },
    },
    {
        accessorKey: "action",
        header: "Action",
    },
]
