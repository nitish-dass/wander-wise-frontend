import * as z from "zod";
import useApi from "@/hooks/useApi";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import api from "@/api/axios";
import { toast } from "sonner";

const baggageSchema = z.object({
  name: z.string().min(3, "Item should be atleast 3 characters"),
  // completed: z.boolean(),
});

const BaggageDetails = () => {
  const [dependency, setDependency] = React.useState(0);

  const { tripId } = useParams();
  console.log(tripId);

  const { error, loading, data } = useApi(`/${tripId}/baggages`, {}, [
    dependency,
  ]);

  const form = useForm({
    resolver: zodResolver(baggageSchema),
    defaultValues: {
      name: "",
      // completed: false,
    },
  });

  if (loading) {
    return <Loader2 className="animate-spin" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const onSubmit = async (formData) => {
    console.log(formData);

    try {
      const response = await api.post(`/${tripId}/baggages`, formData)
       
       if(response.status === 201) {
        toast.success("Item added successfully")
        
        setDependency(dependency + 1);
       } else {
        toast.error(response.message || "Unable to add item")
       }
    } catch (error) {
      toast.error(error.message || "Unable to add item")
      console.log(error)
    }
  };

  const handleDelete = async(id) => {
    try {
      const deleteResponse = await api.delete(`/${tripId}/baggages/${id}`)

      if(deleteResponse.status === 200 ) {
        toast.success("Baggage deleted successfully")
        
        setDependency(dependency + 1)
      } else {
        toast.error(deleteResponse.message || "Failed to delete")
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete")
    }
  }

  const onCheck = async(id, status, name) => {
    try {
      const checkResponse = await api.patch(`/${tripId}/baggages/${id}`, {completed: !status, name: name } )

      if(checkResponse.status === 200 ) {
        toast.success("Baggage updated successfully")
        
        setDependency(dependency + 1)
      } else {
        toast.error(checkResponse.message || "Failed to update")
      }
    } catch (error) {
      toast.error(error.message || "Failed to update")
    }
  }

  return (
    <section className="mt-20 px-20 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl mt-1 font-bold">
            Baggage List
          </CardTitle>
          <CardDescription className="mt-2 text-sm italic">
            All the items you need for this trip
          </CardDescription>
          <CardAction>
            <Dialog>
              <DialogTrigger>Open</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    Add items in your baggage for this trip.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {/* <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" placeholder="Clothes" />
                  </div> */}
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                          Enter Item Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="text"
                          placeholder="Medicines"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Button setDependency={setDependency} type="submit" className={"mt-4 w-full"}>
                    Submit
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {!data?.length ? (
            <div className="py-40">
              No bagges for this trip. Add baggage with the help of button
              above.
            </div>
          ) : (
            data.map((item) => {
              return (
                // display page garnu
                <div
                  key={item._id}
                  className={`${item.completed ? "bg-primary/30" : ""} flex items-center justify-between rounded-lg border p-3`}
                >
                  {/* Left Side */}
                  <div className="flex items-center gap-3">
                    <Checkbox
                    onClick={() => {onCheck(item._id, item.completed, item.name)}}
                    checked={item.completed} />

                    <span
                      className={`capitalize font-medium ${
                        item.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center gap-2">
                    {/* <button
                      onClick={() => handleEdit(item)}
                      className="cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>

                    html buttons

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="cursor-pointer"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button> */}

                    <Button size="icon" variant="outline">
                      <Pencil />
                    </Button>
                    <Button
                    onClick={() => {handleDelete(item._id)}}
                    setDependency={setDependency}
                    size="icon"
                    variant="outline"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default BaggageDetails;
