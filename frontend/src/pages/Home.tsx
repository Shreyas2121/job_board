import { checkSession } from "@/api/query";
import JobBoard from "@/components/JobBoard";
import { useEffect } from "react";

const Home = () => {
  return (
    <div className="min-h-screen" style={{ marginTop: "5.5rem" }}>
      <section className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-white mb-6">Job Listings</h1>

        {/* Job Listings Table */}
        <JobBoard />
      </section>
    </div>
  );
};

export default Home;
