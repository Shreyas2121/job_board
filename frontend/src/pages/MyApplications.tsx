import { fetchApplications } from "@/api/query";
import { columns } from "@/components/table/applications/column";
import { DataTable } from "@/components/table/data-table";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const MyApplications = () => {
  const query = useQuery({
    queryKey: ["applications"],
    queryFn: () => fetchApplications(),
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error fetching applications</div>;
  }

  return (
    <div className="min-h-screen" style={{ marginTop: "5.5rem" }}>
      <section className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-white mb-6">My Applications</h1>

      
        <DataTable columns={columns} data={query.data!} />
      </section>
    </div>
  );
};

export default MyApplications;
