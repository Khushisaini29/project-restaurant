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
    pending: "bg-[#FFF5D9] text-[#9A741A]",
    preparing: "bg-[#EAF2FF] text-[#3568A8]",
    outOfDelivery: "bg-[#F1EAFE] text-[#7651A8]",
    delivered: "bg-[#EAF6EC] text-[#397548]",
    cancelled: "bg-[#FCEAEA] text-[#A33D3D]",
  };

  return colors[status] || "bg-[#F3EEE7] text-[#6F675F]";
};

const OrderHistory = ({ orders, onStatusChange }) => {
  return (
    <section className="min-h-full bg-[#F8F3EA] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#C89B5D]">
            Restaurant Orders
          </p>

          <h2 className="font-serif text-4xl font-normal text-[#171512] md:text-5xl">
            Order History
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#8F887F]">
            Manage customer orders and keep track of their current status.
          </p>
        </div>

        {/* No Orders */}
        {orders?.length === 0 && (
          <div className="rounded-sm border border-[#E5DDD2] bg-white px-6 py-16 text-center shadow-sm">
            <p className="font-serif text-2xl text-[#171512]">
              No orders found
            </p>

            <p className="mt-2 text-sm text-[#8F887F]">
              Customer orders will appear here once they are placed.
            </p>
          </div>
        )}

        {/* Orders */}
        <div className="space-y-7">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-sm border border-[#E5DDD2] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              {/* Order Header */}
              <div className="border-b border-[#E5DDD2] bg-[#FCFAF7] px-6 py-5">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  {/* Order ID */}
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8F887F]">
                      Order ID
                    </p>

                    <p className="break-all text-sm font-medium text-[#171512]">
                      {order._id}
                    </p>
                  </div>

                  {/* Customer */}
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8F887F]">
                      Customer
                    </p>

                    <p className="text-sm font-medium text-[#171512]">
                      {order.customerId?.name || "Unknown Customer"}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8F887F]">
                      Order Status
                    </p>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        onStatusChange(order._id, e.target.value)
                      }
                      className={`cursor-pointer rounded-full border border-transparent px-4 py-2 text-xs font-semibold outline-none transition-all ${getStatusColor(
                        order.status
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
              </div>

              {/* Order Items */}
              <div className="px-6 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-serif text-xl text-[#171512]">
                    Items
                  </h3>

                  <span className="text-xs text-[#8F887F]">
                    {order.CartItem?.length || 0} item(s)
                  </span>
                </div>

                <div className="space-y-3">
                  {order.CartItem?.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col gap-4 rounded-sm border border-[#EAE3D9] bg-[#FCFAF7] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      {/* Item Information */}
                      <div className="flex items-center gap-4">
                        {/* Image */}
                        {item.foodId?.image?.[0] ? (
                          <img
                            src={item.foodId.image[0]}
                            alt={item.foodId.name}
                            className="h-16 w-16 rounded-sm object-cover"
                          />
                        ) : (
                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-[#EDE6DC] text-[10px] uppercase tracking-wide text-[#8F887F]">
                            No Image
                          </div>
                        )}

                        {/* Food Details */}
                        <div>
                          <p className="font-serif text-base text-[#171512]">
                            {item.foodId?.name || "Unknown Item"}
                          </p>

                          <p className="mt-1 text-sm text-[#8F887F]">
                            ₹{item.foodId?.price} × {item.quantity}
                          </p>
                        </div>
                      </div>

                      {/* Item Total */}
                      <p className="text-base font-semibold text-[#C89B5D]">
                        ₹{item.foodId?.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="flex flex-col gap-5 border-t border-[#E5DDD2] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                {/* Customer Email */}
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8F887F]">
                    Customer Email
                  </p>

                  <p className="break-all text-sm font-medium text-[#6F675F]">
                    {order.customerId?.email || "No email available"}
                  </p>
                </div>

                {/* Total */}
                <div className="sm:text-right">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8F887F]">
                    Total Amount
                  </p>

                  <p className="font-serif text-2xl text-[#171512]">
                    ₹{order.totalCartValue}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderHistory;