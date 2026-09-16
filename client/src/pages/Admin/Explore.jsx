import React, { useEffect } from "react";
import FoodStore from "../../store/FoodStore";
import { Edit2Icon, Trash } from "lucide-react";
import { useNavigate } from "react-router";

const Explore = () => {
  const { getAllFood, foodData, deleteFoodMenu } = FoodStore();

  const navigate = useNavigate();

  useEffect(() => {
    getAllFood();
  }, []);

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#F8F3EA] px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#C89B5D]">
            Restaurant Menu
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>
              <h1 className="font-serif text-4xl font-normal text-[#171512]">
                All Menu Items
              </h1>

              <p className="mt-3 text-sm text-[#8F887F]">
                Manage dishes available in your restaurant.
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/create-menu")}
              className="w-fit bg-[#C89B5D] px-5 py-3 text-sm font-semibold text-[#171512] transition hover:bg-[#B88A4E]"
            >
              + Create Menu
            </button>

          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden border border-[#E5DDD2] bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px] text-left text-sm">

              {/* Table Header */}
              <thead className="border-b border-[#39342E] bg-[#171512] text-[#FFFFFF]">
                <tr>

                  <th className="px-6 py-4 font-medium">
                    Food Name
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Price
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Category
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Availability
                  </th>

                  <th className="px-6 py-4 text-center font-medium">
                    Delete
                  </th>

                  <th className="px-6 py-4 text-center font-medium">
                    Edit
                  </th>

                </tr>
              </thead>

              {/* Table Body */}
              <tbody>

                {foodData.map((obj) => (
                  <tr
                    key={obj._id}
                    className="border-b border-[#E5DDD2] transition hover:bg-[#FCFAF7]"
                  >

                    {/* Food Name */}
                    <th className="px-6 py-5 font-medium text-[#171512]">
                      {obj.name}
                    </th>

                    {/* Price */}
                    <td className="px-6 py-5 font-semibold text-[#C89B5D]">
                      ₹{obj.price}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-[#F3EEE7] px-3 py-1 text-xs capitalize text-[#6F675F]">
                        {obj.category}
                      </span>
                    </td>

                    {/* Availability */}
                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          obj.isAvailable
                            ? "bg-[#EDF7EE] text-[#3D7A48]"
                            : "bg-[#FBECEC] text-[#A33D3D]"
                        }`}
                      >
                        {obj.isAvailable
                          ? "Available"
                          : "Unavailable"}
                      </span>

                    </td>

                    {/* Delete */}
                    <td className="px-6 py-5 text-center">

                      <button
                        onClick={(e) => {
                          deleteFoodMenu(
                            e.currentTarget.dataset.foodId
                          ).then(() => {
                            getAllFood();
                          });
                        }}
                        data-food-id={obj._id}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#A33D3D] transition hover:bg-[#FBECEC]"
                      >
                        <Trash size={17} />
                      </button>

                    </td>

                    {/* Edit */}
                    <td className="px-6 py-5 text-center">

                      <button
                        onClick={() =>
                          navigate(
                            `/admin/create-menu/${obj._id}`
                          )
                        }
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#C89B5D] transition hover:bg-[#F3EEE7]"
                      >
                        <Edit2Icon size={17} />
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>

          {/* Empty State */}
          {foodData.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="font-serif text-xl text-[#171512]">
                No menu items yet
              </p>

              <p className="mt-2 text-sm text-[#8F887F]">
                Create your first menu item to get started.
              </p>
            </div>
          )}

        </div>
      </div>

    </section>
  );
};

export default Explore;