import { useEffect } from "react";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
} from "lucide-react";

import OrderStore from "../../store/OrderStore";

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

const getStatusStyle = (status) => {
  const styles = {
    pending:
      "bg-[#FFF4D6] text-[#9A741A] border-[#EBD9A7]",

    preparing:
      "bg-[#EAF2FF] text-[#3568A8] border-[#C9DBF2]",

    outOfDelivery:
      "bg-[#F1EAFE] text-[#7651A8] border-[#DCCDF3]",

    delivered:
      "bg-[#EAF6EC] text-[#397548] border-[#C9E3CF]",

    cancelled:
      "bg-[#FCEAEA] text-[#A33D3D] border-[#EACACA]",
  };

  return (
    styles[status] ||
    "bg-[#F3EEE7] text-[#6F675F] border-[#E5DDD2]"
  );
};

const getStatusIcon = (status) => {
  if (status === "delivered") {
    return <CheckCircle2 size={14} />;
  }

  if (status === "outOfDelivery") {
    return <Truck size={14} />;
  }

  if (status === "preparing") {
    return <Package size={14} />;
  }

  return <Clock size={14} />;
};

const Orders = () => {

  // IMPORTANT:
  // orderData lowercase hai
  const {
    orderData,
    fetchUserOrder,
  } = OrderStore();

  // Fetch orders when page loads
  useEffect(() => {
    fetchUserOrder();
  }, [fetchUserOrder]);

  const orders = orderData || [];

  return (
    <section className="min-h-full bg-[#F8F3EA] px-4 py-10 sm:px-6 md:py-14">

      <div className="mx-auto max-w-6xl">

        {/* =========================
            PAGE HEADER
        ========================= */}
        <div className="mb-10">

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C89B5D]">
            Your Orders
          </p>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

            <div>
              <h1 className="font-serif text-4xl font-normal tracking-tight text-[#171512] sm:text-5xl">
                Order History
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#8F887F]">
                View your previous orders and keep track of
                their current status.
              </p>
            </div>

            {orders.length > 0 && (
              <span className="text-sm text-[#8F887F]">
                {orders.length}{" "}
                {orders.length === 1
                  ? "order"
                  : "orders"}
              </span>
            )}

          </div>
        </div>

        {/* =========================
            NO ORDERS
        ========================= */}
        {orders.length === 0 ? (

          <div className="mx-auto max-w-xl border border-[#E4DCCF] bg-white px-6 py-20 text-center shadow-[0_8px_30px_rgba(23,21,18,0.04)]">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EFE6]">

              <Package
                size={30}
                strokeWidth={1.5}
                className="text-[#C89B5D]"
              />

            </div>

            <h2 className="mt-6 font-serif text-3xl text-[#171512]">
              No orders yet
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#8F887F]">
              Your completed and active orders will appear
              here.
            </p>

          </div>

        ) : (

          /* =========================
              ORDERS
          ========================= */
          <div className="space-y-6">

            {orders.map((order, index) => {

              const items = order.CartItem || [];

              return (
                <article
                  key={order._id || index}
                  className="overflow-hidden border border-[#E4DCCF] bg-white shadow-[0_5px_25px_rgba(23,21,18,0.045)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(23,21,18,0.08)]"
                >

                  {/* =========================
                      ORDER HEADER
                  ========================= */}
                  <div className="border-b border-[#E5DDD2] bg-[#FCFAF7] px-5 py-5 sm:px-7">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>

                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8F887F]">
                          Order ID
                        </p>

                        <p className="font-medium text-[#171512]">
                          #
                          {String(order._id || "")
                            .slice(-6)
                            .toUpperCase()}
                        </p>

                      </div>

                      {/* STATUS */}
                      <div
                        className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${getStatusStyle(
                          order.status
                        )}`}
                      >

                        {getStatusIcon(order.status)}

                        <span>
                          {formatStatus(order.status)}
                        </span>

                      </div>

                    </div>
                  </div>

                  {/* =========================
                      ITEMS
                  ========================= */}
                  <div className="px-5 py-6 sm:px-7">

                    <div className="mb-5 flex items-center justify-between">

                      <h2 className="font-serif text-2xl text-[#171512]">
                        Order Items
                      </h2>

                      <span className="text-xs text-[#8F887F]">
                        {items.length}{" "}
                        {items.length === 1
                          ? "item"
                          : "items"}
                      </span>

                    </div>

                    <div className="space-y-3">

                      {items.length > 0 ? (

                        items.map((item, itemIndex) => {

                          const food = item.foodId;

                          return (
                            <div
                              key={
                                item._id ||
                                itemIndex
                              }
                              className="flex flex-col gap-4 border border-[#EAE3D9] bg-[#FCFAF7] p-4 sm:flex-row sm:items-center sm:justify-between"
                            >

                              {/* FOOD INFO */}
                              <div className="flex items-center gap-4">

                                {food?.image?.[0] ? (

                                  <img
                                    src={food.image[0]}
                                    alt={food.name}
                                    className="h-20 w-20 shrink-0 rounded-sm object-cover"
                                  />

                                ) : (

                                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm bg-[#F3EEE7]">

                                    <Package
                                      size={22}
                                      strokeWidth={1.5}
                                      className="text-[#C89B5D]"
                                    />

                                  </div>
                                )}

                                <div>

                                  <h3 className="font-serif text-lg text-[#171512]">
                                    {food?.name ||
                                      "Food Item"}
                                  </h3>

                                  <p className="mt-1 text-sm text-[#8F887F]">
                                    ₹
                                    {food?.price ||
                                      0}{" "}
                                    ×{" "}
                                    {item.quantity}
                                  </p>

                                </div>

                              </div>

                              {/* ITEM TOTAL */}
                              <div className="text-left sm:text-right">

                                <p className="text-[10px] uppercase tracking-[0.15em] text-[#8F887F]">
                                  Item Total
                                </p>

                                <p className="mt-1 text-base font-semibold text-[#C89B5D]">
                                  ₹
                                  {(food?.price ||
                                    0) *
                                    item.quantity}
                                </p>

                              </div>

                            </div>
                          );
                        })

                      ) : (

                        <p className="py-6 text-center text-sm text-[#8F887F]">
                          No items found in this order.
                        </p>

                      )}

                    </div>
                  </div>

                  {/* =========================
                      FOOTER
                  ========================= */}
                  <div className="border-t border-[#E5DDD2] px-5 py-5 sm:px-7">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                      <div>

                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8F887F]">
                          Order Status
                        </p>

                        <p className="mt-1 text-sm text-[#6F675F]">
                          {formatStatus(
                            order.status
                          )}
                        </p>

                      </div>

                      <div className="sm:text-right">

                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8F887F]">
                          Total Amount
                        </p>

                        <p className="mt-1 font-serif text-2xl text-[#171512]">
                          ₹
                          {order.totalCartValue ||
                            0}
                        </p>

                      </div>

                    </div>
                  </div>

                </article>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
};

export default Orders;