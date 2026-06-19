import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sabrina Carpenter",
    role: "Solo traveler",
    avatar: "/images/avatar-1.png",
    rating: 5,
    quote:
      "Wanderly turned a chaotic two-week Europe trip into a smooth, day-by-day plan. I didn't miss a single booking and actually enjoyed the planning for once!",
  },
  {
    name: "Jhonny Chen",
    role: "Family of four",
    avatar: "/images/avatar-2.png",
    rating: 5,
    quote:
      "Coordinating flights, hotels, and activities for the whole family used to be a nightmare. Now everything lives in one place and everyone stays in the loop.",
  },
  {
    name: "Comatozze Okafor",
    role: "Digital nomad",
    avatar: "/images/avatar-3.png",
    rating: 5,
    quote:
      "As someone always on the move, the budget tracking and offline itineraries are game changers. The support team genuinely saved my trip in Lisbon.",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-700">
            Loved by travelers
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trusted by adventurers around the world
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-slate-600">
            Join thousands of happy travelers who plan smarter and explore more with Wanderly.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="group flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1.5 hover:bg-teal-600 hover:shadow-xl hover:ring-teal-600"
            >
              <Quote className="h-8 w-8 text-teal-500 transition-colors group-hover:text-white" aria-hidden="true" />

              <div className="mt-4 flex gap-0.5" aria-label={`Rated ${t.rating} out of 5`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-slate-700 transition-colors group-hover:text-teal-50">
                {`"${t.quote}"`}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 transition-colors group-hover:border-teal-500">
                <img
                  src={t.avatar || "/placeholder.svg"}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-transparent transition-all group-hover:ring-white"
                />
                <div>
                  <p className="font-semibold text-slate-900 transition-colors group-hover:text-white">{t.name}</p>
                  <p className="text-sm text-slate-500 transition-colors group-hover:text-teal-100">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
