import React, { useEffect } from "react";
import FoodStore from "../../store/FoodStore";
import { Edit2Icon, Trash } from "lucide-react";
import { useNavigate } from "react-router";

const Explore = () => {
  const { getAllFood, foodData, deleteFoodMenu } = FoodStore();
  console.log(foodData);
  const navigate = useNavigate();
  useEffect(() => {
    getAllFood();
  }, []);

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
          <tr>
            <td scope="col" className="px-6 py-3 font-medium">
              Food Name
            </td>
            <td scope="col" className="px-6 py-3 font-medium">
              Food Price
            </td>
            <td scope="col" className="px-6 py-3 font-medium">
              Food Category
            </td>
            <td scope="col" className="px-6 py-3 font-medium">
              Food Avaibility
            </td>
            <td scope="col" className="px-6 py-3 font-medium">
              Delete
            </td>
            <td scope="col" className="px-6 py-3 font-medium">
              Edit
            </td>
          </tr>
        </thead>
        <tbody>
          {foodData.map((obj) => (
            <tr
              className="bg-neutral-primary border-b border-default"
              key={obj._id}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-heading whitespace-nowrap"
              >
                {obj.name}
              </th>
              <td className="px-6 py-4">{obj.price}</td>
              <td className="px-6 py-4">{obj.category}</td>
              <td className="px-6 py-4">{obj.isAvailable ? "Yes" : "No"}</td>
              <td className="px-6 py-4">
                <Trash
                  data-food-id={obj._id}
                  onClick={(e) => {
                    deleteFoodMenu(e.currentTarget.dataset.foodId).then(() => {
                      getAllFood();
                    });
                    // console.log(e.currentTarget.dataset.foodId);
                  }}
                  color="#fc1c03"
                />
              </td>
              <td className="px-6 py-4">
                <Edit2Icon
                  color="#037ffc"
                  onClick={() => navigate(`/admin/create-menu/${obj._id}`)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Explore;