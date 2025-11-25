"use client";

import React from "react";

function ContactUs() {
  return (
    <section className="bg-white text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <p className="inline-flex items-center rounded-full border border-slate-300 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              Contact
            </p>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-slate-900">
              Let’s grow something beautiful together
            </h1>

            <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
              Whether you’re dreaming up a new skincare line or looking for guidance with
              D2C branding, we’re here to listen. Send us a note and we’ll be back within
              one business day.
            </p>

            {/* INFO CARDS */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </h2>
                <p className="mt-2 text-lg font-medium text-slate-900">
                  info@uandinaturals.com
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  We usually reply within 24 hours.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Phone
                </h2>
                <p className="mt-2 text-lg font-medium text-slate-900">
                  +91 73388 73353
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Mon – Fri, 10 AM – 6 PM IST
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Studio
                </h2>
                <p className="mt-2 text-lg font-medium text-slate-900">
                  U&I Naturals
                </p>
                <p className="text-sm text-slate-500">
                  U&I Naturals, Coimbatore, Tamil Nadu, India - 641038
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@uandinaturals.com"
                    className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                What are you looking for?
                <select
                  name="projectType"
                  defaultValue=""
                  className="h-12 rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                >
                  <option value="" disabled>
                    Pick a service
                  </option>
                  <option value="branding">Branding</option>
                  <option value="formulation">Product Formulation</option>
                  <option value="manufacturing">Manufacturing Support</option>
                  <option value="strategy">D2C Launch Strategy</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Tell us about your project
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Share your goals, product ideas, or skin-safe requirements."
                  className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  By sending this form, you agree to our privacy terms.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-green-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* EXTRA FOOTER */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
          <p>
            You’re also welcome to drop by our studio to explore natural ingredients, try
            samples, and meet our team behind U&I Naturals.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
