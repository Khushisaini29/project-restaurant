import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import OrderStore from "../../store/OrderStore";

const Cart = () => {
  const {
    CartItemData: cart,
    addToCart,
    removeToCart,
    cartCount,
    CreateOrder,
  } = OrderStore();
  //   const [cart, setCart] = useState([
  //     {
  //       _id: "6a7091f0a5f0a0c183e6c1b3",
  //       name: "Rajma Chawal",
  //       price: 800,
  //       quantity: 5,
  //     },
  //     {
  //       _id: "6a8851686b43584635229132",
  //       name: "Masala Dosa",
  //       price: 100,
  //       quantity: 2,
  //     },
  //   ]);

  //   const increaseQuantity = (id) => {
  //     setCart((prev) =>
  //       prev.map((item) =>
  //         item._id === id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       )
  //     );
  //   };

  //   const decreaseQuantity = (id) => {
  //     setCart((prev) =>
  //       prev
  //         .map((item) =>
  //           item._id === id
  //             ? { ...item, quantity: item.quantity - 1 }
  //             : item
  //         )
  //         .filter((item) => item.quantity > 0)
  //     );
  //   };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

      <div className="space-y-3">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm"
          >
            <div>
              <h3 className="font-medium text-gray-900">{item.name}</h3>

              <p className="text-sm text-gray-500">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => removeToCart(item._id)}
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                <Minus size={16} />
              </button>

              <span className="w-5 text-center font-medium">
                {item.quantity}
              </span>

              <button
                onClick={() => addToCart({ _id: item._id })}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white hover:bg-gray-800 transition"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {cartCount > 0 ? (
        <button
          onClick={() => CreateOrder()}
          className="bg-black px-8 border-rouned-full text-2xl text-white py-2 "
        >
          Create Order
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;