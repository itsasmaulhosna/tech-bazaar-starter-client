const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const ProductDetailspage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${SERVER_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Back Button */}
        <div className="mb-6">
          <a
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
          >
            ← Back to Products
          </a>
        </div>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Product Image */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 sm:p-10 lg:p-12 flex items-center justify-center">
              <div className="w-full max-w-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[300px] sm:h-[400px] lg:h-[520px] object-contain rounded-2xl"
                />
              </div>
            </div>

            {/* Product Content */}
            <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">

              {/* Badge */}
              <div className="mb-4">
                {product.quantity > 0 ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-sm font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h1>

              {/* Description */}
              <p className="mt-5 text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-400">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-7">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  ৳{product.price.toLocaleString()}
                </span>
              </div>

              {/* Stock */}
              <div className="mt-5 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Available:</span>

                <span className="font-semibold text-gray-900 dark:text-white">
                  {product.quantity} units
                </span>
              </div>

              {/* Divider */}
              <div className="my-7 border-t border-gray-200 dark:border-gray-800"></div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Quantity
                </label>

                <div className="flex items-center w-fit border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
                  <button
                    className="w-11 h-11 flex items-center justify-center text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    −
                  </button>

                  <span className="w-12 h-11 flex items-center justify-center font-semibold border-x border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
                    1
                  </span>

                  <button
                    className="w-11 h-11 flex items-center justify-center text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-7 flex flex-col sm:flex-row gap-3">

                <button
                  disabled={product.quantity === 0}
                  className="flex-1 px-6 py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
         <form action="/api/payment" method="POST">
                <input value={product.price} name="price" type="hidden"/>
                <input value={product.name} name="name" type="hidden"/>
                <input value={product._id} name="productId" type="hidden"/>
                <button type="submit"
                  disabled={product.quantity === 0}
                  className="flex-1 px-6 py-3.5 rounded-xl border-2 border-black dark:border-white text-gray-900 dark:text-white font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy Now
                </button>
              </form>
                

              </div>

              {/* Product Information */}
              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Product ID
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white truncate">
                    {product._id}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Availability
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                    {product.quantity > 0 ? "Available" : "Unavailable"}
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
            <div className="text-2xl mb-3">🚚</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Fast Delivery
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Quick and reliable delivery to your doorstep.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Secure Payment
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Your payment information is safe and protected.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
            <div className="text-2xl mb-3">↩️</div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Easy Returns
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Hassle-free return policy for eligible products.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailspage;