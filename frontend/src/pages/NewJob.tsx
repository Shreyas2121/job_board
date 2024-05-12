import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newJobSchema } from "@/lib/form-schema";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createJob, fetchJob, updateJob } from "@/api/query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { handleApiErrors } from "@/lib/utils";

const NewJob = () => {
  const navigate = useNavigate();

  const jobMut = useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/");
    },
    onError: handleApiErrors,
  });

  const form = useForm<z.infer<typeof newJobSchema>>({
    resolver: zodResolver(newJobSchema),
    defaultValues: {
      title: "",
      company_name: "",
      description: "",
      category: "",
      location: "",
      requirements: "",
    },
  });

  function onSubmit(values: z.infer<typeof newJobSchema>) {
    jobMut.mutate(values);
  }

  return (
    <div className="container mx-auto py-12 px-4 mt-6">
      <div className="bg-white shadow-md rounded-md p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      className="bg-blue-100 text-gray-800 focus-visible:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      className="bg-blue-100 text-gray-800 focus-visible:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      required
                      className="bg-blue-100 text-gray-800 focus-visible:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      className="bg-blue-100 text-gray-800 focus-visible:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      className="bg-blue-100 text-gray-800 focus-visible:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="bg-blue-100 text-gray-800 focus-visible:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6">
              <Button
                disabled={jobMut.isPending}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewJob;
