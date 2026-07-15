import * as z from "zod";
import useApi from "@/hooks/useApi";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
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

const baggageSchema = z.object({
  name: z.string().min(3, "Item should be atleast 3 characters"),
  completed: z.boolean(),
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
      completed: false,
    },
  });

  if (loading) {
    return <Loader2 className="animate-spin" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

 

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Baggage List</CardTitle>
          <CardDescription>
            All the items you need for this trip
          </CardDescription>
          <CardAction>...</CardAction>
        </CardHeader>
        <CardContent>
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
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  {/* Left Side */}
                  <div className="flex items-center gap-3">
                    <Checkbox checked={item.completed} />

                    <span
                      className={`font-medium ${
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
                    <button
                      onClick={() => handleEdit(item)}
                      className="cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="cursor-pointer"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
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
