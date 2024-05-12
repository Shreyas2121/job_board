import { createApplication, fetchJob } from "@/api/query";
import { Button } from "@/components/ui/button";
import { handleApiErrors } from "@/lib/utils";
import { useAuthStore } from "@/store/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();

  const applyMut = useMutation({
    mutationFn: createApplication,

    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
    },

    onError: handleApiErrors,
  });

  const { id } = useParams();

  const currentUserId = useAuthStore((state) => state.user?.id!);

  if (!id) return null;

  const query = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJob(Number(id)),
  });

  if (query.isLoading) return <div>Loading...</div>;

  const job = query.data!;

  const handleApply = (jobId: number) => {
    applyMut.mutate(jobId);
  };

  return (
    <div className="container mx-auto py-12 px-4 mt-6">
      <div className="bg-white shadow-md rounded-md p-6">
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-6 mt-2">Job Details </h1>

        <h2 className="text-2xl font-bold mb-4">{job.title}</h2>

        <div className="text-gray-700">
          <p>
            <span className="font-medium">Company:</span> {job.company}
          </p>
          <p>
            <span className="font-medium">Location:</span> {job.location}
          </p>
          <p>
            <span className="font-medium">Posted On:</span>{" "}
            {new Date(job.datePosted).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p>{job.description}</p>
        </div>

        {job.requirements && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p>{job.description}</p>
          </div>
        )}

        {currentUserId !== job.userId && (
          <>
            {job.applied ? (
              <span className="text-red-500">
                You have already applied for this job
              </span>
            ) : (
              <div className="mt-6">
                <Button
                  onClick={() => handleApply(job.id)}
                  disabled={applyMut.isPending}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Apply Now
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Details;
