import { CloudSun, MapPinned, Users, Wallet } from "lucide-react";
import React from "react";

const Features = () => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {
            featuresData.map((feature, index) => {
                return (
                    <div>
                        {feature.title}
                    </div>
        )
        })}
      </div>
    </section>
  );
};

export default Features;
