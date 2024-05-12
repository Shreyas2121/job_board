import { Button } from "@/components/ui/button";
import { Application, Job } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<Application>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Company",
    accessorKey: "company",
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => {
      return <div>{row.original.category.toUpperCase()}</div>;
    },
  },
  {
    header: "Location",
    accessorKey: "location",

    cell: ({ row }) => {
      return <div>{row.original.location.toUpperCase()}</div>;
    },
  },
  {
    header: "Date Applied",
    accessorKey: "dateApplied",
    cell: ({ row }) => {
      const date = new Date(row.original.dateApplied);
      const formatted = date.toLocaleDateString();

      return (
        <div>
          <div>{formatted}</div>
        </div>
      );
    },
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Link
            className="
            flex gap-2 items-center bg-blue-400 text-white p-2 rounded-md
          "
            to={`/details/${row.original.id}`}
          >
            <span>View Details</span>
          </Link>
        </div>
      );
    },
  },
];
