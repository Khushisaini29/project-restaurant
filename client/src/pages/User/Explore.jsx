import { useEffect } from "react";
import FoodStore from "../../store/FoodStore";
import FoodCard from "../../component/FoodCard";
import CartIcon from "../../component/CartIcon";
import OrderStore from "../../store/OrderStore";

const Explore = () => {
  const { foodData, getAllFood } = FoodStore();
  const { addToCart } = OrderStore();
  useEffect(() => {
    getAllFood();
  }, []);
  return (
    <>
      <div className="flex flex-row gap-2 my-5 justify-center px-3">
        {foodData.map((obj) => (
          <FoodCard
             key={obj._id}
            onClick={() => {
              addToCart(obj);
            }}
            food={obj}
          />
        ))}
      </div>
      <CartIcon />
    </>
  );
};

export default Explore;