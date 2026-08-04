import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === "open") {
    redirect("/pricing");
  }

  const customerEmail = session.customer_details?.email;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-green-50 px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-green-100 bg-white p-10 shadow-xl">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            🎉 Subscription Activated!
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Thank you for becoming a seller. Your subscription has been
            activated successfully.
          </p>

          {customerEmail && (
            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Confirmation sent to
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                {customerEmail}
              </p>
            </div>
          )}

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              href="/dashboard"
              className="rounded-xl bg-primary px-6 py-3 text-center font-semibold text-white transition hover:opacity-90"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/"
              className="rounded-xl border px-6 py-3 text-center font-semibold transition hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>

          <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-5 text-left">
            <h3 className="font-semibold text-green-700">
              What's Next?
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>✅ Access your Seller Dashboard</li>
              <li>✅ Add your first product</li>
              <li>✅ Manage orders and inventory</li>
              <li>✅ Track sales and earnings</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}