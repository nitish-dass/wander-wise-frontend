import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import api from "@/api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const budgetSchema = z.object({
  total: z.coerce.number(),
  spent: z.coerce.number(),
});

const tripFormSchema = z.object({
  title: z.string().min(5, "Title should be atleast 5 characters"),
  description: z.string().min(20, "Description must be atleast 5 characters"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  destinations: z.array(
    z.string().min(3, "Destination must be atleast 3 characters"),
  ),
  budget: budgetSchema,
});

const TripForm = () => {

  const navigate = useNavigate();
  
  const form = useForm({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      destinations: [" "],
      budget: {
        total: "",
        spent: 0,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "destinations",
  });

  const onSubmit = async (tripFormData) => {
    console.log(tripFormData);

    try {
      const response = await api.post("/trips", tripFormData);

      if(response.status === 201) {
        toast.success("Trip created successfully")
        
        navigate("/trips")
      } else {
        toast.error(response.message || "Unable to create Trip")
      }
    } catch (error) {
      toast.error(error.message || "Unable to create Trips ")
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-screen">
      <Card className="w-1/3 mx-auto mt-40 mb-20">
        <CardHeader className="text-center">
          <CardTitle className="text-center text-2xl">
            Create your trip
          </CardTitle>
          <CardDescription>Fill in the details for your trip</CardDescription>
          {/* <CardAction>Card Action</CardAction> */}
        </CardHeader>
        <CardContent className="space-y-4">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter Trip Title</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Trip to Heaven"
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Must be less than 30 characters
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Enter Trip Description
                </FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Description here"
                  aria-invalid={fieldState.invalid}
                />
                {/* <FieldDescription></FieldDescription> */}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4 border border-gray-300 rounded-lg p-4">
            <Controller
              name="startDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Start Date</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="date"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="endDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>End Date</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="date"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="border border-gray-300 rounded-lg p-4 y-4">
             <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Destinations</h3>
              <Button type="button" onClick={() => {append(" ")}} variant="outline" size="sm">Add Destination</Button>
             </div>
          {fields.map((item, index) => {
            return (
              <Controller
              key = {index}
                name={`destinations[${index}]`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Destination {index + 1}
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="Kuta Beach"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            );
          })}
          </div>

          <div className="grid grid-cols-2 gap-4 border border-gray-300 rounded-lg p-4">
            <Controller
              name="budget.total"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Total Budget</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    placeholder="200000"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="budget.spent"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Spent Amount</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    placeholder="2000"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default TripForm;
