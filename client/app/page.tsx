import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">
            Transaction Transparency Platform
          </h1>
          <p className="mt-3 text-slate-600">
            A production-ready platform for transparent donations, auditable
            campaigns, and accountable NGOs. Donors can track impact, NGOs can
            manage beneficiaries, and admins can approve and monitor every
            transaction.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              href="/signup"
            >
              Get Started
            </a>
            <a
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
              href="/login"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
