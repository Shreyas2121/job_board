import { Job } from "@/lib/types";
import React, { useState } from "react";
import { DataTable } from "./table/data-table";
import { columns } from "./table/joblistings/column";
import { fetchCategories, fetchJobs, fetchLocations } from "@/api/query";
import Options from "@/components/Options";

import { useQueries } from "@tanstack/react-query";

const JobBoard = () => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const [jobsQuery, categoriesQuery, locationsQuery] = useQueries({
    queries: [
      {
        queryKey: ["jobs", { category, location }],
        queryFn: () => fetchJobs({ category, location }),
      },
      {
        queryKey: ["categories"],
        queryFn: fetchCategories,
      },
      {
        queryKey: ["locations"],
        queryFn: fetchLocations,
      },
    ],
  });

  if (
    jobsQuery.isLoading ||
    categoriesQuery.isLoading ||
    locationsQuery.isLoading
  ) {
    return <div>Loading...</div>;
  }

  if (jobsQuery.isError || categoriesQuery.isError || locationsQuery.isError) {
    return <div>Error fetching jobs</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div className="mb-2 md:mb-0">
          <Options
            text="Select Category"
            data={categoriesQuery.data!}
            setValue={setCategory}
            value={category}
          />
        </div>
        <div className="mb-2 md:mb-0">
          <Options
            text="Select Location"
            data={locationsQuery.data!}
            setValue={setLocation}
            value={location}
          />
        </div>
      </div>
      <DataTable columns={columns} data={jobsQuery.data!} />
    </div>
  );
};

export default JobBoard;
