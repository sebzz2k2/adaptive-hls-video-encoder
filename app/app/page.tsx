import Image from "next/image";
import { Search, ChevronUp, Play, Trash2, RefreshCw, Eye, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar";
import { DataTable } from "@/components/data-table/table"
import {  columns, DashboardCols} from "@/components/data-table/columns"

export default function Home() {
  return (
  <>
  <Navbar />
  <Dashboard />
  </>
  );
}

function Dashboard() {
  const data : DashboardCols[]  = [
    {
      id: "1",
      name: "Video 1",
      size : 300,
      uploadTime: "2023-10-01",
      status: "processing",
    },
    {
      id: "2",
      name: "Video 2",
      size :2024,
      uploadTime: "2023-10-02",
      status: "pending",
    },
    {
      id: "3",
      name: "Video 3",
      size : 200,
      uploadTime: "2023-10-03",
      status: "success",
    },
    {
      id : "4",
      name: "Video 4",
      size : 2024000,
      uploadTime: "2023-10-04",
      status: "failed",
    },
    {
      id: "5",
      name: "Video 5",
      size: 500,
      uploadTime: "2023-10-04",
      status: "failed", 
    }
  ]
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Main Content */}
      <main className="px-8 py-6">
        <div className="">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <Button>Upload Video</Button>
          </div>

          {/* Search Bar */}
          <div className="mb-6 w-[20%]">
            <Input type="text" placeholder="Search here.." className="bg-black border-gray-700 pl-3 pr-10 py-2 w-96" icon={<Search className="text-gray-400" size={20} />}/>
          </div>

          {/* Table */}
          <DataTable columns={columns} data={data} /> 

          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 text-sm">
            <span className="mr-2">1</span>
            <span className="mx-2 text-gray-400">2</span>
            <span className="mx-2 text-gray-400">3...</span>
            <span className="ml-2 flex items-center text-gray-400">
              Next <ChevronRight size={16} />
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
