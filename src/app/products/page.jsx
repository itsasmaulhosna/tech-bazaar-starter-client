const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const Productpage = async () => {
  const res = await fetch(`${SERVER_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">
        All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {product.title}
              </h2>

              <p className="text-gray-600 text-sm mb-3">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">
                  ${product.price}
                </span>

                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productpage;