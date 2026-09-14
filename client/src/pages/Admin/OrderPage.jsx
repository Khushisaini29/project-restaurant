import { useEffect } from "react";
import OrderStore from "../../store/OrderStore";
import OrderHistory from "./OrderHistory";

const OrdersPage = () => {
  const { orderData, fetchAdminOrder ,OrderStatusChange} = OrderStore();

  //   const handleStatusChange = async (orderId, newStatus) => {
  //     console.log("Order:", orderId);
  //     console.log("New Status:", newStatus);

  //     try {
  //       const response = await fetch(`/api/orders/${orderId}/status`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           status: newStatus,
  //         }),
  //       });

  //       const data = await response.json();

  //       if (!response.ok) {
  //         throw new Error(data.message || "Failed to update status");
  //       }

  //       console.log("Status updated:", data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  useEffect(() => {
    fetchAdminOrder();
  }, [fetchAdminOrder]);

  return (
    <OrderHistory
      orders={orderData}
       onStatusChange={OrderStatusChange}
    />
  );
};

export default OrdersPage;