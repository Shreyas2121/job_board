import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateJobSchema } from "@/lib/form-schema";
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
import { fetchJob, updateJob } from "@/api/query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { handleApiErrors } from "@/lib/utils";
import { JobDetail } from "@/lib/types";

const UpdateJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { state } = useLocation();

  const jobUpdateMut = useMutation({
    mutationFn: updateJob,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/postedJobs");
    },
    onError: handleApiErrors,
  });

  if (!id) return null;

  const form = useForm<z.infer<typeof updateJobSchema>>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      title: state?.title,
      company_name: state?.company,
      description: state?.description,
      requirements: state.requirements ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof updateJobSchema>) {
    console.log(values);
    jobUpdateMut.mutate({ ...values, id: Number(id) });
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
                disabled={jobUpdateMut.isPending}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateJob;
