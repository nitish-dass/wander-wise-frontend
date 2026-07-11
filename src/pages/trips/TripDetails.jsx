import useApi from "@/hooks/useApi";
import { Loader2, MapPin, Pencil, Pin, Receipt, Wallet } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
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
import { getPassedDays, getTripStatus } from "@/lib/dateCalculator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/api/axios";
import { formatShortDate, formatWeekday } from "@/lib/formatter";
import InviteForm from "@/components/shared/inviteForm";

const TripDetails = () => {
  const [dependency, setDependency] = React.useState(0);

  const { tripId } = useParams();
  console.log(tripId);

  const { error, loading, data } = useApi(`/trips/${tripId}`, {}, [dependency]);

  if (loading) {
    return <Loader2 className="animate-spin" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const trip = data;

  const FONT_IMPORT =
    "@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Space+Mono:wght@400;700&display=swap');";

  const Tape = ({ className = "", colorClass = "bg-amber-300" }) => (
    <div
      className={`absolute -top-3 h-6 w-16 ${colorClass} opacity-80 shadow-sm ${className}`}
    />
  );

  const budgetLine =
    trip.budget.total > 0
      ? Math.min((trip.budget.spent / trip.budget.total) * 100, 100)
      : 0;

  const expenseSubmit = async () => {
    const name = document.getElementById("name");
    const amount = document.getElementById("amount");

    if (!name.value || !amount.value) {
      toast.error("Please fill all the fields");
      return;
    }

    const expenseData = {
      name: name.value,
      amount: Number(amount.value),
      date: new Date().toISOString(),
    };

    try {
      const response = await api.patch(
        `/trips/${tripId}/expenses`,
        expenseData,
      );
      console.log(response);

      if (response.status === 200) {
        toast.success("Expense added successfully");
        name.value = "";
        amount.value = "";

        setDependency(dependency + 1);
      } else {
        toast.error(response.message || "Failed to add expense");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add expense");
      console.log(error);
    }
  };

  function Stamp({ shortDate, weekDay, colorClass, ringClass }) {
    return (
      <div className="flex justify-center -rotate-6">
        <div
          className={`flex h-38 w-38 flex-col items-center justify-center rounded-full border-2 border-dashed ${ringClass}`}
        >
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className={`text-sm font-bold tracking-widest ${colorClass}`}
          >
            {weekDay}
          </span>
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className="my-1 text-xl font-bold leading-none text-slate-800"
          >
            {shortDate}
          </span>
          <span
            style={{ fontFamily: "'Space Mono', monospace" }}
            className={`text-lg font-bold tracking-widest ${colorClass}`}
          >
            POSTED
          </span>
        </div>
      </div>
    );
  }

  const overBudget = trip.budget.spent > trip.budget.total;
  const stopColors = [
    {
      bg: "bg-rose-50",
      border: "border-rose-200",
      pin: "text-rose-500 fill-rose-500",
    },
    {
      bg: "bg-amber-50",
      border: "border-amber-200",
      pin: "text-amber-500 fill-amber-500",
    },
    {
      bg: "bg-teal-50",
      border: "border-teal-200",
      pin: "text-teal-500 fill-teal-500",
    },
    {
      bg: "bg-violet-50",
      border: "border-violet-200",
      pin: "text-violet-500 fill-violet-500",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 px-4 py-20 md:px-10 md:py-20 lg:grid-cols-4 lg:px-20 lg:py-20">
      <style>{FONT_IMPORT}</style>
      <div className="lg:col-span-3 p-4">
        <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6">
          <Card className="col-span-12 md:col-span-8 lg:col-span-12 -rotate-1 rounded-2xl border-slate-200">
            <Tape colorClass="bg-amber-300" className="left-[8%] -rotate-6" />
            <Tape colorClass="bg-rose-400" className="left-[88%] rotate-6" />
            {/* Header card */}

            <CardHeader className="mb-3 border-b pb-2">
              {/* <CardHeader className="flex flex-col gap-4 mb-3 border-b pb-4 md:flex-row md:items-start md:justify-between"> */}
              <CardTitle
                style={{ fontFamily: "'Caveat', cursive" }}
                className="text-3xl mt-1 font-bold uppercase text-teal-800 leading-none md:text-5xl lg:text-6xl"
              >
                {trip.title}
              </CardTitle>
              <CardDescription className="mt-2 text-sm italic">
                {trip.description}
              </CardDescription>
              <CardAction className="w-full md:w-auto">
                <a href={`/trips/edit/${trip._id}`}>
                  <Button type="button">
                    <Pencil />
                    Edit
                  </Button>
                </a>
              </CardAction>
            </CardHeader>

            <CardContent className="space-y-6 p-2 md:p-4 lg:p-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* start date */}
                <Card className="flex-1 text-center rotate-2 rounded-2xl border-slate-200">
                  <Tape
                    colorClass="bg-teal-300"
                    className="left-[30%] -translate-x-1/2 -rotate-6"
                  />
                  <CardHeader>
                    <CardDescription className="text-center text-md font-bold uppercase tracking-[0.2em] text-slate-500">
                      Departs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Stamp
                      shortDate={formatShortDate(trip.startDate)}
                      weekDay={formatWeekday(trip.startDate)}
                      colorClass="text-teal-600"
                      ringClass="border-teal-400"
                    />
                  </CardContent>
                  <CardFooter className="justify-center">
                    <p className="text-center text-sm font-semibold text-teal-700">
                      {getPassedDays(trip.startDate, trip.endDate)}
                    </p>
                  </CardFooter>
                  {/* <CardContent className="space-y-1">
                    <p className="text-lg underline">Trip start date:</p>
                    <p>{trip.startDate.split("T")[0]}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {getPassedDays(trip.startDate, trip.endDate)}
                    </p>
                  </CardContent> */}
                </Card>

                {/* end date */}
                <Card className="flex-1 text-center rotate-2 rounded-2xl border-slate-200">
                  <Tape
                    colorClass="bg-rose-300"
                    className="left-[75%] -translate-x-1/2 rotate-6"
                  />
                  <CardHeader>
                    <CardDescription className="text-center text-md font-bold uppercase tracking-[0.2em] text-slate-500">
                      Returns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Stamp
                      shortDate={formatShortDate(trip.endDate)}
                      weekDay={formatWeekday(trip.endDate)}
                      colorClass="text-rose-600"
                      ringClass="border-rose-400"
                    />
                  </CardContent>
                  <CardFooter className="justify-center">
                    <p className="text-center text-sm font-semibold text-rose-700">
                      {getTripStatus(trip.startDate, trip.endDate)}
                    </p>
                  </CardFooter>
                  {/* <CardContent className="space-y-1">
                    <p className="text-lg underline">Trip end date:</p>
                    <p>{trip.endDate.split("T")[0]}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {" "}
                      {getTripStatus(trip.startDate, trip.endDate)}
                    </p>
                  </CardContent> */}
                </Card>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* budget */}
                <Card className="rotate-1 rounded-2xl border-slate-200">
                  <Tape
                    colorClass="bg-lime-300"
                    className="left-[85%] -rotate-6"
                  />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                      <Wallet size={15} />
                      Budget set
                    </CardTitle>
                    <CardAction>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${overBudget ? "bg-rose-100 text-rose-700" : "bg-teal-100 text-teal-700"}`}
                      >
                        {overBudget ? "OVER" : "ON TRACK"}
                      </span>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <p
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      className="text-2xl md:text-4xl font-bold text-slate-800"
                    >
                      {`${Number(trip.budget.total).toLocaleString("en-IN")}`}{" "}
                    </p>
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${overBudget ? "bg-rose-500" : "bg-teal-500"}`}
                        style={{ width: `${budgetLine}%` }}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p
                      className={`text-xs font-medium ${overBudget ? "text-red-600" : "text-slate-400"}`}
                    >
                      {overBudget
                        ? `${Number(trip.budget.spent - trip.budget.total).toLocaleString("en-IN")} over budget`
                        : `${Number(trip.budget.total - trip.budget.spent).toLocaleString("en-IN")} still free to spend`}
                    </p>
                  </CardFooter>
                </Card>

                {/* expense list */}
                <Card className="rotate-1 rounded-2xl border-slate-200">
                  <Tape
                    colorClass="bg-violet-300"
                    className="left-[85%] rotate-6"
                  />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                      <Receipt size={15} />
                      Total spent so far
                    </CardTitle>
                    <CardAction>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                        {trip.budget.expenses.length} entries
                      </span>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <p
                      style={{ fontFamily: "'Space Mono', monospace" }}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-600"
                    >
                      {/* {trip.budget.spent} */}
                      {`${Number(trip.budget.spent).toLocaleString("en-IN")}`}
                    </p>
                  </CardContent>
                  <CardFooter className="block border-t border-dashed border-slate-200 pt-3">
                    <div className="max-h-32 space-y-1.5 overflow-y-auto pr-1">
                      {trip.budget.expenses.map((expense) => (
                        <div
                          key={expense.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="truncate pr-2 text-slate-500 capitalize">
                            {expense.name}
                          </span>
                          <span
                            style={{ fontFamily: "'Space Mono', monospace" }}
                            className="whitespace-nowrap text-slate-800"
                          >
                            {/* {expense.amount} */}
                            {`${Number(expense.amount).toLocaleString("en-IN")}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </div>

              {/* desitnations */}
              <Card className="relative col-span-12 rounded-2xl border-slate-200 md:col-span-8 lg:col-span-12">
                <Tape
                  colorClass="bg-fuchsia-300"
                  className="left-[10%] rotate-6"
                />
                <Tape
                  colorClass="bg-mauve-500"
                  className="left-[85%] -rotate-6"
                />
                <CardHeader>
                  <CardTitle className="text-xs uppercase font-semibold flex items-center tracking-widest text-slate-500 gap-1.5 ">
                    <MapPin size={18} /> Stops
                  </CardTitle>
                  <CardAction>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                      {trip.destinations.length} stops
                    </span>
                  </CardAction>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  {trip.destinations.map((location, i) => {
                    const c = stopColors[i % stopColors.length];
                    const rotateClass = i % 2 === 0 ? "-rotate-2" : "rotate-2";

                    return (
                      <div
                        key={location}
                        className={`relative min-w-37.5 rounded-lg border px-5 py-4 pt-6 ${c.bg} ${c.border} ${rotateClass}`}
                      >
                        <Pin
                          size={16}
                          className={`absolute -top-2 left-1/2 -translate-x-1/2 rotate-12 ${c.pin}`}
                        />
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Stop {i + 1}
                        </p>
                        <p className="text-sm font-semibold text-slate-800 capitalize">
                          {location}
                        </p>
                      </div>
                    );
                  })}

                  {/* <p className="text-xs uppercase font-semibold flex items-center gap-1.5 text-gray-900 mb-2 border-b pb-2">
                     <MapPin size={18} /> Stops
                   </p> */}
                  {/* <ol className="list-decimal pl-6 space-y-1">
                     {trip?.destinations?.map((destination, index) => (
                       <li key={index}>{destination}</li>
                     ))}
                   </ol> */}
                </CardContent>
              </Card>
            </CardContent>
            {/* footer */}

            <CardFooter className="text-xs text-slate-400 justify-center m-3 py-3 tracking-wide rounded-2xl">
              <span className="capitalize">{trip.title}</span> .{" "}
              {formatShortDate(trip.startDate)} —{" "}
              {formatShortDate(trip.endDate)}
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* right part to add expense */}
      {/* <div className="col-span-1 border border-gray-300 rounded-lg p-4"> */}
      <div className="space-y-4 lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Add your expense</CardTitle>
            <CardDescription>Enter details of this expense </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Bus Ticket" />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="100" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={expenseSubmit} className="w-full">
              Add Expense
            </Button>
          </CardFooter>
        </Card>

        <InviteForm />
      </div>
    </section>
  );
};

export default TripDetails;
