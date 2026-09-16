import { ShoppingCart } from "lucide-react";

export default function FoodCard({ food, onClick }) {
  return (
    <article className="group w-full overflow-hidden rounded-sm border border-[#E5DDD2] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-[#F3EEE7]">
        <img
          src={food.image?.[0]}
          alt={food.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Availability */}
        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-medium tracking-wide ${
            food.isAvailable
              ? "bg-[#EDF7EE] text-[#3D7A48]"
              : "bg-[#FBECEC] text-[#A33D3D]"
          }`}
        >
          {food.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Name + Price */}
        <div className="mb-2 flex items-start justify-between gap-4">
          <h2 className="truncate font-serif text-xl font-normal text-[#171512]">
            {food.name}
          </h2>

          <span className="whitespace-nowrap text-base font-semibold text-[#C89B5D]">
            ₹{food.price}
          </span>
        </div>

        {/* Description */}
        <p className="mb-5 line-clamp-2 text-sm leading-6 text-[#8F887F]">
          {food.description}
        </p>

        {/* Category + Cart */}
        <div className="flex items-center justify-between gap-3">

          <span className="rounded-full bg-[#F3EEE7] px-3 py-1 text-[11px] font-medium capitalize tracking-wide text-[#6F675F]">
            {food.category}
          </span>

          <button
            disabled={!food.isAvailable}
            onClick={onClick}
            className="flex items-center gap-2 rounded-sm bg-[#C89B5D] px-4 py-2.5 text-xs font-semibold text-[#171512] transition-all duration-200 hover:bg-[#B88A4E] disabled:cursor-not-allowed disabled:bg-[#D6D0C8] disabled:text-[#8F887F]"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>

        </div>
      </div>
    </article>
  );
}