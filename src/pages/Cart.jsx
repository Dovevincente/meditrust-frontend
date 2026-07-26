import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, getTotal } = useCart();

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-3xl font-bold text-darkBlue mb-8">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid gap-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded-lg"
            >
              <div>
                <h2 className="text-darkBlue font-semibold">
                  {item.name}
                </h2>
                <p className="text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-darkBlue font-bold">
                  {item.price}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL */}
          <div className="mt-6 text-xl font-bold text-darkBlue">
            Total: ₦{getTotal().toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;