import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "Paracetamol",
    price: "2500",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400",
  },
  {
    id: 2,
    name: "Vitamin C",
    price: "3200",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400",
  },
  {
    id: 3,
    name: "Cough Syrup",
    price: "4000",
    image: "https://images.unsplash.com/photo-1580281658629-1a3d4cfd3b7d?w=400",
  },
  {
    id: 4,
    name: "Antibiotics",
    price: "5500",
    image: "https://images.unsplash.com/photo-1582719478171-9d5b3c3c4b1c?w=400",
  },
];

const Pharmacy = () => {
  const { addToCart } = useCart();

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-darkBlue">
            Pharmacy Store
          </h2>
          <p className="text-gray-600 mt-3">
            Order your medications safely and conveniently
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (
            <div
              key={product.id}
              className="group border rounded-2xl overflow-hidden shadow-sm transition transform hover:-translate-y-2 hover:bg-lemon"
            >
              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              {/* CONTENT */}
              <div className="p-5 text-center">

                <h3 className="text-lg font-semibold text-darkBlue group-hover:text-darkBlue">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1 group-hover:text-darkBlue">
                  ₦{Number(product.price).toLocaleString()}
                </p>

                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                    })
                  }
                  className="mt-4 bg-darkBlue text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition"
                >
                  Add to Cart
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Pharmacy;