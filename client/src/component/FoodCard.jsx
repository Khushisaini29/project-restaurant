import { ShoppingCart } from "lucide-react";

export default function FoodCard({ food, onClick }) {
  console.log("FOOD CARD:", food);
  
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md">

      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={food.image?.[0]}
          alt={food.name}
          className="h-full w-full object-cover"
        />

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            food.isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {food.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h2 className="truncate text-xl font-bold text-gray-900">
            {food.name}
          </h2>

          <span className="whitespace-nowrap text-lg font-bold text-orange-600">
            ₹{food.price}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-500">
          {food.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
            {food.category}
          </span>

          <button
            disabled={!food.isAvailable}
            onClick={onClick}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <ShoppingCart size={17} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}