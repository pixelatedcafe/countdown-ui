"use client";

import React from "react";

function ReachOut() {
  return (
    <section className="bg-white text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24">

        {/* HEADING */}
        <div className="space-y-4 text-center">
          <p className="inline-flex items-center rounded-full border border-slate-300 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            Contact Us
          </p>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl text-slate-900">
            We're Here for Your Skin’s Journey
          </h1>

          <p className="max-w-2xl mx-auto text-base text-slate-600 sm:text-lg">
            Have a question about our products, your order, or your skincare routine?  
            Our team at U&I Naturals is always happy to help.
          </p>
        </div>

        {/* CONTACT DETAILS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Email
            </h2>
            <p className="mt-2 text-lg font-medium text-slate-900">
              info@uandinaturals.com
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Product queries, orders & support
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

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Store 
            </h2>
            <p className="mt-2 text-lg font-medium text-slate-900">U&I Naturals</p>
            <p className="text-sm text-slate-500">
              Coimbatore, Tamil Nadu, India — 641038
            </p>
          </div>
        </div>

        {/* FOOTNOTE */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
          <p>
            Drop by to try our products, explore ingredients, or just say hello —  
            your skin’s story matters to us.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ReachOut;
