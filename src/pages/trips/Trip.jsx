import useApi from "@/hooks/useApi";
import { Loader2 } from "lucide-react";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/formatter";

const Trip = () => {
  const { data, error, loading } = useApi("/trips");

  if (loading) {
    //conditional rendering
    return <Loader2 />;
  }

  return (
    <div className="mt-20 p-20">
      <Card>
        <CardHeader className="boarder-b">
          <CardTitle>Your Trips</CardTitle>
          <CardDescription>Trips that you are part of:</CardDescription>
          <CardAction>
            <a href="/trips/add">
              <Button type="button">Add Trip</Button>
            </a>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.length == 0 ? 
              <div>No Trips available to show.</div>
             : 
              data.data.map((trip) => {
                return (
                  <Card>
                    <CardHeader>
                      <CardTitle>{trip.title}</CardTitle>
                      <CardDescription>{formatDate(trip.startDate)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Budget: <span>{trip.budget.total}</span></p>
                      <p>Spent: <span>{trip.budget.spent}</span></p>
                    </CardContent>
                    <CardFooter>
                      {
                        trip.destinations.map((destination) => {
                          return (
                            <span className="bg-amber-50 px-2 py-1 rounded-sm text-sm">
                              {destination}
                            </span>
                          )
                        })
                      }
                    </CardFooter>
                  </Card>
                );
              })
            }
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Trip;
