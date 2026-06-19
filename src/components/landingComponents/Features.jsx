import { CloudSun, InfoIcon, MapPinned, Users, Wallet } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const Features = () => {
  // const [age, setAge] = useState(10); //stateVariable or useState HOOK

  const featuresData = [
    {
      icon: MapPinned,
      title: "Smart Planning",
      description:
        "Create detailed itineraries, organize destinations, and manage travel schedules with ease.",
    },
    {
      icon: Users,
      title: "Group Trips",
      description:
        "Collaborate with friends, share plans, assign tasks, and coordinate every journey smoothly.",
    },
    {
      icon: Wallet,
      title: "Expense Tracking",
      description:
        "Monitor travel expenses, split costs fairly, and keep budgets under control throughout.",
    },
    {
      icon: CloudSun,
      title: "Weather Updates",
      description:
        "Get destination weather forecasts to plan activities and avoid unexpected travel disruptions.",
    },
  ];

  return (
    <section className="px-20 py-32">
      <div>
        <h2 className="text-5xl font-bold mb-24 text-center">Features</h2>
      </div>

      <Alert>
        <InfoIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
        <AlertAction>
          <Button variant="outline">Enable</Button>
        </AlertAction>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {featuresData.map((feature, index) => {
          return (
            <div key={index} className="border border-grey-300 p-4 rounded-2xl">
              {/* unique parameter rakhne key ma. icon component ho */}
              <div className="flex justify-center">
                <feature.icon className="h-10 w-10 text-yellow-500" />
              </div>

              <h3 className="text-xl font-medium my-2 text-center underline">
                {feature.title}
              </h3>

              <p className="text-center">{feature.description}</p>

              <Button variant="outline">heysiri</Button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
