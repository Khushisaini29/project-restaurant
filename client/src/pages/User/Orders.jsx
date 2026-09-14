import { useEffect } from "react";
import OrderHistory from "../../component/OrderHistory";
import OrderStore from "../../store/OrderStore";

const Orders = () => {
  const { fetchUserOrder, orderData } = OrderStore();

  useEffect(() => {
    fetchUserOrder();
  }, []);
  return (
    <div>
      <OrderHistory orderData={orderData} />
    </div>
  );
};

export default Orders;