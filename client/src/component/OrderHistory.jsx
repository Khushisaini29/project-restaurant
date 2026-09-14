

const OrderHistory = ({ orderData = [] }) => {
 
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>

      {orderData.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-5">
          {orderData.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-semibold">
                    #{order._id.slice(-6).toUpperCase()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {order.CartItem.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    {/* Image */}
                    {item.foodId.images?.length > 0 ? (
                      <img
                        src={item.foodId.images[0]}
                        alt={item.foodId.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.foodId.name}</h3>

                      <p className="text-sm text-gray-500">
                        ₹{item.foodId.price} × {item.quantity}
                      </p>
                    </div>

                    {/* Item Total */}
                    <p className="font-medium">
                      ₹{item.foodId.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-5 pt-4 border-t">
                <span className="text-gray-500">
                  {order.CartItem.length}{" "}
                  {order.CartItem.length === 1 ? "item" : "items"}
                </span>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-bold">₹{order.totalCartValue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;