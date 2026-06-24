import { Mail, Phone, Heart, Share2, MessageCircle, Users } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', id: 'about' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  const servicesLinks = [
    { label: 'Trip Planning', href: '#' },
    { label: 'Itinerary Builder', href: '#' },
    { label: 'Booking', href: '#' },
    { label: 'Travel Guides', href: '#' },
  ];

  const companyLinks = [
    { label: 'About Us', id: 'about' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Disclaimer', href: '#' },
  ];

  const socialLinks = [
    { icon: Heart, label: 'Facebook', href: '#' },
    { icon: Share2, label: 'Twitter', href: '#' },
    { icon: MessageCircle, label: 'Instagram', href: '#' },
    { icon: Users, label: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-100">
      {/* Main Footer Content */}
      <div className="border-b border-slate-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">WanderWise</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Your trusted companion for seamless travel experiences.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-teal-500 mt-0.5" />
                  <span className="text-sm">support@wanderwise.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-teal-500 mt-0.5" />
                  <span className="text-sm">+977 9812345678</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Navigation</h3>
              <ul className="space-y-2.5">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    {link.id ? (
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="text-sm text-slate-400 transition-colors hover:text-teal-400 cursor-pointer"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} className="text-sm text-slate-400 transition-colors hover:text-teal-400">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Services</h3>
              <ul className="space-y-2.5">
                {servicesLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-slate-400 transition-colors hover:text-teal-400">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Company</h3>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    {link.id ? (
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="text-sm text-slate-400 transition-colors hover:text-teal-400 cursor-pointer"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a href={link.href} className="text-sm text-slate-400 transition-colors hover:text-teal-400">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="mb-4 font-semibold text-white">Legal</h3>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-slate-400 transition-colors hover:text-teal-400">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Copyright */}
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} WanderWise. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-5">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-800 text-slate-400 transition-all hover:bg-teal-600 hover:text-white"
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium text-teal-400 transition-colors hover:text-teal-300"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
