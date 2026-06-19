import { Compass, Globe2, HeadphonesIcon, ShieldCheck } from "lucide-react"

const stats = [
  { value: "12K+", label: "Trips planned" },
  { value: "85+", label: "Countries covered" },
  { value: "4.9/5", label: "Average rating" },
  { value: "24/7", label: "Travel support" },
]

const features = [
  {
    icon: Compass,
    title: "Smart itineraries",
    description: "Build day-by-day plans in minutes with routes, timings, and bookings in one place.",
  },
  {
    icon: Globe2,
    title: "Worldwide coverage",
    description: "From weekend city breaks to month-long expeditions across 85+ countries.",
  },
  {
    icon: ShieldCheck,
    title: "Secure bookings",
    description: "Your reservations and payments are protected with bank-grade security.",
  },
  {
    icon: HeadphonesIcon,
    title: "Always-on support",
    description: "Real humans ready to help you anytime, anywhere your travels take you.",
  },
]

export default function About() {
  return (
    <section id="about" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src="/images/about-travel.png"
                alt="Traveler overlooking a coastal mountain view at golden hour"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 rounded-2xl bg-teal-600 px-6 py-4 text-white shadow-lg sm:-right-6">
              <p className="text-2xl font-bold leading-none">10+</p>
              <p className="mt-1 text-sm text-teal-50">years of journeys</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-700">
              About Wanderly
            </span>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Travel planning made effortless, so you can focus on the adventure
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-slate-600">
              We started Wanderly with a simple belief: planning a trip should be as exciting as the
              trip itself. Our platform brings flights, stays, activities, and budgets together into
              one beautifully organized place, helping thousands of travelers turn ideas into
              unforgettable journeys.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 rounded-3xl bg-slate-50 p-8 sm:p-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-teal-600 sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
