import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const activitiesSchema = z.object({
  name: z.string().min(3, "Name should be atleast 3 characters"),
  time: z.string().min(3, "Time should be atleast 3 characters"),
  notes: z.array(z.string().min(5, "Notes must be atleast 5 characters")),
});

const formSchema = z.object({
  title: z.string().min(5, "Title must be atleast 5 characters"),
  description: z.string().optional(),
  date: z.coerce.date(),
  // activities: z.array(
  //   z.string().min(3, "Activities must be atleast 3 characters"),
  // ),
  activities: z.array(activitiesSchema),
});

const ItineraryForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      activities: [{
        name: "",
        time: "",
        notes: [""],
      },
    ],
      date: new Date().toISOString().split("T")[0],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "activities",
  });

  const onSubmit = async (itineraryFormData) => {
    console.log(itineraryFormData);
  };

  return (
    <form className="min-h-screen">
      <Card className="w-1/3 mx-auto mt-40 mb-20">
        <CardHeader className="text-center">
          <CardTitle className="text-center text-2xl">
            Create Itineraries
          </CardTitle>
          <CardDescription>Fill in the details for your trip.</CardDescription>
        </CardHeader>
        <CardContent className={"space-y-4"}>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Enter Itinerary Title
                </FieldLabel>
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
                <FieldLabel htmlFor={field.name}>Enter Description</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Trip to Bali."
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter Date</FieldLabel>
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

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Activities
            </h3>
            <Button onClick={() => {append({name: "", time: "", notes: [""]})}}
            type="button" variant="outline">
              Add Activity
            </Button>
          </div>

          {fields.map((activity, index) => {
            return (
              <div key={index} className="border border-gray-200 p-4 roundd">
                <Controller
                  name={`activities[${index}].name`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Name of activity
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Morning"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name={`activities [${index}].time`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Enter time of day
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Visit to xyz"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            );
          })}

          <Button type="submit">Submit</Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default ItineraryForm;
