const ORDER_STATUSES = [
  "pending",
  "preparing",
  "outOfDelivery",
  "delivered",
  "cancelled",
];

const formatStatus = (status) => {
  const statusMap = {
    pending: "Pending",
    preparing: "Preparing",
    outOfDelivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return statusMap[status] || status;
};

const getStatusColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700",
    preparing: "bg-blue-100 text-blue-700",
    outOfDelivery: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return colors[status] || "bg-gray-100 text-gray-700";
};

const OrderHistory = ({ orders, onStatusChange }) => {
  return (
    <div className="w-full space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">Order History</h2>

      {orders?.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      {orders?.map((order) => (
        <div
          key={order._id}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          {/* Header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium text-gray-800">{order._id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium text-gray-800">
                {order.customerId?.name}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="mb-1 text-sm text-gray-500">Order Status</p>

              <select
                value={order.status}
                onChange={(e) => onStatusChange(order._id, e.target.value)}
                className={`rounded-lg border-none px-3 py-2 text-sm font-medium outline-none ${getStatusColor(
                  order.status,
                )}`}
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {formatStatus(status)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800">Items</h3>

            {order.CartItem?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex items-center gap-3">
                  {/* Image */}
                  {item.foodId?.images?.[0] ? (
                    <img
                      src={item.foodId.images[0]}
                      alt={item.foodId.name}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-200 text-xs text-gray-500">
                      No Image
                    </div>
                  )}

                  <div>
                    <p className="font-medium text-gray-800">
                      {item.foodId?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      ₹{item.foodId?.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="font-semibold text-gray-800">
                  ₹{item.foodId?.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-sm text-gray-500">Customer Email</p>
              <p className="text-sm font-medium text-gray-700">
                {order.customerId?.email}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>

              <p className="text-xl font-bold text-gray-900">
                ₹{order.totalCartValue}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;