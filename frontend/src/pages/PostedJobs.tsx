import { fetchPostedJobs } from "@/api/query";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/jobposted/columns";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PostedJobs = () => {
  const query = useQuery({
    queryKey: ["posted-jobs"],
    queryFn: () => fetchPostedJobs(),
  });

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error fetching jobs</div>;
  }

  return (
    <div className="min-h-screen" style={{ marginTop: "5.5rem" }}>
      <section className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-white mb-6">Posted Jobs</h1>

        <DataTable columns={columns} data={query.data!} />
      </section>
    </div>
  );
};

export default PostedJobs;
