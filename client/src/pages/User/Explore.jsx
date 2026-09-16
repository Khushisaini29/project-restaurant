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
    <section className="min-h-full bg-[#F8F3EA]">

      {/* Page Header */}
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#C89B5D]">
          Our Menu
        </p>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>
            <h1 className="font-serif text-4xl font-normal text-[#171512] md:text-5xl">
              Explore our menu
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#6f675f]">
              Discover delicious dishes prepared with fresh ingredients
              and served with care.
            </p>
          </div>

          <div className="text-sm text-[#8F887F]">
            {foodData.length} dishes available
          </div>

        </div>
      </div>

      {/* Food Cards */}
      <div className="mx-auto max-w-7xl px-6 pb-16">

        {foodData.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {foodData.map((obj) => (
              <FoodCard
                key={obj._id}
                food={obj}
                onClick={() => addToCart(obj)}
              />
            ))}

          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-[#8F887F]">
              No dishes available right now.
            </p>
          </div>
        )}

      </div>

      {/* Floating Cart */}
      <CartIcon />

    </section>
  );
};

export default Explore;