import { payment } from '@/lib/actions/payment';
import { stripe } from '@/lib/stripe';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id.');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const {
    status,
    metadata,
    customer_details,
    amount_total,
    currency,
    payment_intent,
  } = session;

  const customerEmail = customer_details?.email;

  if (status === 'open') {
    return redirect('/');
  }

  if (status !== 'complete') {
    return redirect('/');
  }

  // Save payment information
  const payData = await payment({
    ...metadata,
    session_id,
  });

  console.log('Payment saved:', payData);

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'usd',
  }).format((amount_total || 0) / 100);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-2xl">

        {/* Success Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

          {/* Header */}
          <div className="px-6 pb-8 pt-10 text-center sm:px-10 sm:pt-14">

            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5 12 4 4L19 6"
                  />
                </svg>
              </div>
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
              Payment Successful
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Thank you for your purchase!
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600 dark:text-gray-400">
              Your payment has been successfully processed. We&apos;ve received
              your order and will take care of the next steps.
            </p>
          </div>

          {/* Order Details */}
          <div className="border-y border-gray-200 bg-gray-50 px-6 py-6 dark:border-gray-800 dark:bg-gray-950/50 sm:px-10">

            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Payment details
            </h2>

            <div className="mt-5 space-y-4">

              {/* Product */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Product
                  </p>

                  <p className="mt-1 font-medium text-gray-900 dark:text-white">
                    {metadata?.name || 'Product'}
                  </p>
                </div>

                <p className="font-semibold text-gray-900 dark:text-white">
                  {formattedAmount}
                </p>
              </div>

              {/* Email */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Confirmation email
                  </p>

                  <p className="mt-1 break-all font-medium text-gray-900 dark:text-white">
                    {customerEmail || 'Not available'}
                  </p>
                </div>
              </div>

              {/* Transaction */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Transaction ID
                  </p>

                  <p className="mt-1 max-w-[240px] truncate font-mono text-xs text-gray-700 dark:text-gray-300 sm:max-w-md">
                    {payment_intent?.id || session_id}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Status
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Paid
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-8 sm:px-10">

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/30">
              <div className="flex gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11v5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8h.01"
                  />
                </svg>

                <div>
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                    What happens next?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-800 dark:text-blue-400">
                    A confirmation has been sent to your email address. Keep
                    your transaction ID for your records.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/products"
                className="flex-1 rounded-xl bg-black px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
              >
                Continue Shopping
              </Link>

              <Link
                href="/"
                className="flex-1 rounded-xl border border-gray-300 px-5 py-3.5 text-center text-sm font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
              >
                Back to Home
              </Link>

            </div>
          </div>
        </div>

        {/* Support */}
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Need help?{' '}
          <a
            href="mailto:orders@example.com"
            className="font-medium text-gray-900 hover:underline dark:text-white"
          >
            Contact support
          </a>
        </p>

      </div>
    </main>
  );
}