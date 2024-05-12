import { Application, Job, JobDetail } from "@/lib/types";
import { api } from ".";

export const fetchJobs = async ({ category, location }: any) => {
  console.log(category, location);
  const query = new URLSearchParams();
  if (category && category !== "all") {
    query.append("category", category);
  }
  if (location && location !== "all") {
    query.append("location", location);
  }
  const { data } = await api.get(`/jobs?${query.toString()}`);
  return data as Job[];
};

export const fetchCategories = async () => {
  const { data } = await api.get("/jobs/categories");
  return data as [
    {
      id: number;
      name: string;
    }
  ];
};

export const fetchLocations = async () => {
  const { data } = await api.get("/jobs/locations");
  return data as [
    {
      id: number;
      name: string;
    }
  ];
};

export const fetchJob = async (id: number) => {
  const { data } = await api.get(`/jobs/${id}`);
  return data as JobDetail;
};

export const createJob = async (job: any) => {
  const { data } = await api.post("/jobs/create", job);
  return data as {
    message: string;
  };
};

export const checkSession = async () => {
  const res = await api.get("/users/check");
  return res.data as any;
};

export const createApplication = async (jobId: number) => {
  const { data } = await api.post(`/applications/create`, { jobId });
  return data as {
    message: string;
  };
};

export const fetchApplications = async () => {
  const { data } = await api.get("/applications");
  return data as Application[];
};

export const fetchPostedJobs = async () => {
  const { data } = await api.get("/jobs/user");
  return data as Job[];
};

export const updateJob = async (job: any) => {
  const { data } = await api.put(`/jobs/${job.id}`, job);
  return data as {
    message: string;
  };
};
