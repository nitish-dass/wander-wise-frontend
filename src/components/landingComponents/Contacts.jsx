import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      detail: 'support@wanderwise.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '+977 9812345678',
    },
    {
      icon: MapPin,
      title: 'Address',
      detail: 'Biratnagar, Nepal',
    },
  ];

  return (
    <section id="contact" className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900">Get in Touch</h2>
          <p className="text-lg text-slate-600">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="mt-2 block w-full rounded-lg border border-slate-200 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 font-medium text-white transition-all hover:bg-teal-700 hover:shadow-lg active:scale-95"
            >
              <Send className="h-5 w-5" />
              Send Message
            </button>

            {submitted && (
              <div className="rounded-lg bg-green-50 p-4 text-green-800 ring-1 ring-green-200">
                Thank you! Your message has been sent successfully.
              </div>
            )}
          </form>

          {/* Contact Info Cards */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
              <img
                src="/images/contact-hero.png"
                alt="Contact illustration"
                className="mb-6 w-full rounded-xl object-cover h-64"
              />
              <h3 className="mb-6 text-xl font-bold text-slate-900">Contact Information</h3>
              <div className="space-y-5">
                {contactInfo.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{item.title}</p>
                        <p className="text-slate-600">{item.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Info Box */}
            <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 p-6 ring-1 ring-teal-200">
              <p className="text-sm font-medium text-teal-900">
                📍 We typically respond to inquiries within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
