import useApi from "@/hooks/useApi";
import { Ellipsis, Loader2 } from "lucide-react";
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
import api from "@/api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Itinerary = () => {

    const navigate = useNavigate();

  const [dependency, setDependency] = React.useState(0);

  const { data, error, loading } = useApi("/trips", {}, [dependency]);

  if (loading) {
    //conditional rendering
    return <Loader2 className="animate-spin" />;
  }


  return (
    <div className="mt-20 p-20">
      <Card>
        <CardHeader className="boarder-b">
          <CardTitle>Your Trips</CardTitle>
          <CardDescription>Select any one trip to show the Itineraries.</CardDescription>
          <CardAction>
            <a href="/trips/add">
              <Button type="button">Add Trip</Button>
            </a>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.length == 0 ? (
              <div>No Trips available to show.</div>
            ) : (
              data.map((trip) => {
                return (
                  <Card>
                    <CardHeader>
                      <CardTitle className="uppercase text-teal-800">{trip.title}</CardTitle>
                      <CardDescription>
                        {formatDate(trip.startDate)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Budget: <span>{trip.budget.total}</span>
                      </p>
                      <p>
                        Spent: <span>{trip.budget.spent}</span>
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button type="button" onClick={() => {navigate(`/itinerary/${trip._id}`)}} className="w-full">View Itinieraries</Button>
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Itinerary;
