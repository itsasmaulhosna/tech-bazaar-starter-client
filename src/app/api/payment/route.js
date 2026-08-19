import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(request) {
  try {
    console.log('========== PAYMENT API START ==========');

    const headersList = await headers();

    const origin = headersList.get('origin');

    console.log('Origin:', origin);

    const formData = await request.formData();

    console.log('FormData values:', {
      price: formData.get('price'),
      name: formData.get('name'),
      productId: formData.get('productId'),
    });

    const usersession = await auth.api.getSession({
      headers: headersList,
    });

    console.log('User session:', usersession);

    const user = usersession?.user;

    console.log('User:', user);

    const price = formData.get('price');
    const name = formData.get('name');
    const productId = formData.get('productId');
    const userId = user?.id;

    console.log('Checkout data:', {
      price,
      name,
      productId,
      userId,
    });

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,

      line_items: [
        {
          price_data: {
            currency: 'usd',

            product_data: {
              name: name,
            },

            unit_amount: Number(price) * 100,
          },

          quantity: 1,
        },
      ],

      metadata: {
        userId: userId || '',
        productId: productId || '',
        name: name || '',
        price: price || '',
      },

      mode: 'payment',

      success_url: `${origin}/pricing/success-payment?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log('Stripe Session ID:', session.id);
    console.log('Stripe Session Metadata:', session.metadata);
    console.log('Stripe Checkout URL:', session.url);

    console.log('========== PAYMENT API END ==========');

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error('PAYMENT ERROR:', err);

    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
