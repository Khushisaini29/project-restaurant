import { Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import OrderStore from "../../store/OrderStore";

const Cart = () => {
  const {
    CartItemData: cart,
    addToCart,
    removeToCart,
    cartCount,
    CreateOrder,
  } = OrderStore();

  const totalAmount = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <section className="min-h-full bg-[#F8F3EA] px-4 py-10 sm:px-6 md:py-14">
      <div className="mx-auto max-w-6xl">

        {/* =========================
            Page Header
        ========================= */}
        <div className="mb-10">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C89B5D]">
            Your Selection
          </p>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-normal tracking-tight text-[#171512] sm:text-5xl">
                Your Cart
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-[#8F887F]">
                Review your selected dishes and place your order
                when you're ready.
              </p>
            </div>

            {cart.length > 0 && (
              <span className="text-sm text-[#8F887F]">
                {cartCount} item{cartCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* =========================
            Empty Cart
        ========================= */}
        {cart.length === 0 ? (
          <div className="mx-auto max-w-xl border border-[#E4DCCF] bg-white px-6 py-20 text-center shadow-[0_8px_30px_rgba(23,21,18,0.04)]">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EFE6]">
              <ShoppingBag
                size={30}
                strokeWidth={1.5}
                className="text-[#C89B5D]"
              />
            </div>

            <h2 className="mt-6 font-serif text-3xl text-[#171512]">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#8F887F]">
              You haven't added anything to your selection yet.
              Explore our menu and discover something delicious.
            </p>
          </div>
        ) : (

          /* =========================
             Cart + Summary
          ========================= */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">

            {/* =========================
                Cart Items
            ========================= */}
            <div>

              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-2xl text-[#171512]">
                  Selected Dishes
                </h2>

                <span className="text-xs uppercase tracking-[0.15em] text-[#8F887F]">
                  {cart.length} dish{cart.length !== 1 ? "es" : ""}
                </span>
              </div>

              <div className="space-y-4">

                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="group border border-[#E4DCCF] bg-white p-4 shadow-[0_4px_20px_rgba(23,21,18,0.035)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(23,21,18,0.07)] sm:p-5"
                  >

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                      {/* =========================
                          Food Details
                      ========================= */}
                      <div className="flex min-w-0 items-center gap-4">

                        {/* Image */}
                        {item.image?.[0] ? (
                          <img
                            src={item.image[0]}
                            alt={item.name}
                            className="h-24 w-24 shrink-0 rounded-sm object-cover"
                          />
                        ) : (
                          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-sm bg-[#F3EEE7]">
                            <ShoppingBag
                              size={22}
                              strokeWidth={1.5}
                              className="text-[#C89B5D]"
                            />
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C89B5D]">
                            Selected
                          </p>

                          <h3 className="truncate font-serif text-xl text-[#171512] sm:text-2xl">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-sm text-[#8F887F]">
                            ₹{item.price} per item
                          </p>

                          <p className="mt-2 text-sm font-medium text-[#6F675F]">
                            Subtotal:{" "}
                            <span className="text-[#C89B5D]">
                              ₹
                              {Number(item.price) *
                                Number(item.quantity)}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* =========================
                          Quantity Controls
                      ========================= */}
                      <div className="flex items-center justify-between gap-5 sm:justify-end">

                        <span className="text-xs uppercase tracking-[0.12em] text-[#8F887F]">
                          Quantity
                        </span>

                        <div className="flex items-center rounded-full border border-[#D8CFC3] bg-[#FCFAF7] p-1">

                          <button
                            type="button"
                            onClick={() =>
                              removeToCart(item._id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full text-[#171512] transition hover:bg-[#EDE5D9] hover:text-[#C89B5D]"
                            title="Decrease quantity"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="w-9 text-center text-sm font-semibold text-[#171512]">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              addToCart({
                                _id: item._id,
                              })
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171512] text-white transition hover:bg-[#C89B5D] hover:text-[#171512]"
                            title="Increase quantity"
                          >
                            <Plus size={15} />
                          </button>

                        </div>
                      </div>

                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* =========================
                Order Summary
            ========================= */}
            <aside className="h-fit border border-[#E4DCCF] bg-white shadow-[0_8px_30px_rgba(23,21,18,0.05)]">

              {/* Summary Header */}
              <div className="border-b border-[#E5DDD2] bg-[#FCFAF7] px-6 py-6">

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C89B5D]">
                  Checkout
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#171512]">
                  Order Summary
                </h2>
              </div>

              {/* Summary Details */}
              <div className="px-6 py-6">

                <div className="space-y-4">

                  <div className="flex justify-between text-sm">
                    <span className="text-[#8F887F]">
                      Items
                    </span>

                    <span className="font-medium text-[#171512]">
                      {cartCount}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#8F887F]">
                      Subtotal
                    </span>

                    <span className="font-medium text-[#171512]">
                      ₹{totalAmount}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#8F887F]">
                      Delivery
                    </span>

                    <span className="font-medium text-[#397548]">
                      Free
                    </span>
                  </div>

                </div>

                {/* Total */}
                <div className="my-6 border-t border-[#E5DDD2] pt-5">

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-[#8F887F]">
                        Total
                      </p>

                      <p className="mt-1 font-serif text-3xl text-[#171512]">
                        ₹{totalAmount}
                      </p>
                    </div>

                    <span className="text-xs text-[#8F887F]">
                      INR
                    </span>
                  </div>

                </div>

                {/* Create Order */}
                <button
                  type="button"
                  onClick={() => CreateOrder()}
                  className="group flex w-full items-center justify-center gap-3 bg-[#C89B5D] px-6 py-4 text-sm font-semibold text-[#171512] transition-all duration-300 hover:bg-[#B88A4E]"
                >
                  <ShoppingBag size={17} />

                  <span>
                    Create Order
                  </span>

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <p className="mt-4 text-center text-[11px] leading-5 text-[#8F887F]">
                  Freshly prepared with care. Your order
                  will be processed after confirmation.
                </p>

              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;