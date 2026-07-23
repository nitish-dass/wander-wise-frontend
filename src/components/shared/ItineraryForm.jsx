import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import api from "@/api/axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

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

const ActvityItem = ({ activityIndex, control, onRemove}) => {
  const { fields: noteFields, append: appendNote, remove: removeNote } = useFieldArray
  ({
    control, 
    name: `activities[${activityIndex}].notes`
  })

  return (
    <div className="border border-gray-200 p-4 rounded space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Activity {activityIndex + 1}</h4>
        <Button type="button" variant="outline" size="sm" onClick={onRemove}>Remove Activity</Button>
      </div>

      <Controller
                  name={`activities[${activityIndex}].name`}
                  control={control}
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
                  name={`activities [${activityIndex}].time`}
                  control={control}
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

                <div className="border border-gray-100 rounded p-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium">Notes</h5>
                    <Button type="button" variant="secondary" size="sm" onClick={() => appendNote("")}>Add Note</Button>
                  </div>

                  {noteFields.map((note, noteIndex) => (
                    <div key={note.id} className="flex items-start gap-2">
                       <div className="flex-1">
                        <Controller
                  name={`activities[${activityIndex}].notes[${noteIndex}]`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Note {noteIndex + 1}
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="Add a note"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeNote(noteIndex)} className="mt-8">Remove</Button>
                       </div>
                  ))}
                </div>

    </div>
  )
}

const ItineraryForm = () => {

  const { tripId } = useParams();
  const navigate = useNavigate();

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

    try {
      const response = await api.post(`/${tripId}/itineraries`, itineraryFormData)

      if (response.status === 201) {
        toast.success("Itinerary Added successfully")

        navigate("/itinerary")
      } else {
        toast.error(response.message || "Failed to add itinerary")
      }
    } catch (error) {
      toast.error(error.message || "Failed to add itinerary")
      console.log(error)
    }
  };

  return (
    <form className="min-h-screen" onClick={form.handleSubmit(onSubmit)}>
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
                  placeholder="Description here....."
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

              <ActvityItem
              key={activity.id}
              activityIndex={index}
              control={form.control}
              onRemove={() => remove(index)}
              />
            );
          })}
        </CardContent>
        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ItineraryForm;
