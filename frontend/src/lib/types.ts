export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "employer";
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
}

export interface JobPosting {
  id: number;
  title: string;
  description: string;
  userId: number;
  categoryId: number;
  locationId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  datePosted: string;
  cId: number;
  locId: number;
  userId: number;
}

export interface JobDetail {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  datePosted: string;
  description: string;
  requirements: string;
  userId: number;
  applied: boolean;
}

export interface Application {
  id: number;
  company: string;
  title: string;
  location: string;
  dateApplied: string;
  category: string;
}
