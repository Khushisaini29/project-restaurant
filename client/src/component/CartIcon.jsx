import { ShoppingCartIcon } from "lucide-react";
import OrderStore from "../store/OrderStore";

const CartIcon = () => {
  const { cartCount } = OrderStore();
  return (
    <>
      <ShoppingCartIcon
        className="fixed p-2 bottom-34 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gray-600 text-white shadow-lg transition hover:bg-gray-800 hover:scale-105 active:scale-95"
        color="#ffffff"
      />
      <p className="bg-red-600 text-white rounded-full px-2 py-1 fixed text-2xl bottom-38 right-6 z-50 ">
        {cartCount}
      </p>
    </>
  );
};

export default CartIcon;