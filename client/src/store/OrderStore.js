import { create } from "zustand";
import axios from "../libs/axios";
const OrderStore = create((set, get) => ({
  CartItemData: [],
  cartCount: 0,
  orderData: [],
  addToCart: (food) => {
    set((state) => {
      let existingItem = state.CartItemData.find(
        (item) => item._id === food._id,
      );
      if (existingItem) {
        console.log(state);
        return {
          cartCount: state.cartCount + 1,
          CartItemData: state.CartItemData.map((item) => {
            return item._id === food._id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          }),
        };
      }
      console.log(state);
      return {
        cartCount: state.cartCount + 1,
        CartItemData: [
          ...state.CartItemData,
          {
            _id: food._id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1,
          },
        ],
      };
    });
  },
  removeToCart: (id) => {
    set((state) => {
      const existingData = state.CartItemData.find((item) => item._id === id);

      if (!existingData) {
        return state;
      }

      if (existingData.quantity <= 1) {
        return {
          cartCount: state.cartCount - 1,
          CartItemData: state.CartItemData.filter((item) => item._id !== id),
        };
      }

      return {
        cartCount: state.cartCount - 1,

        CartItemData: state.CartItemData.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        }),
      };
    });
  },
  CreateOrder: async () => {
    try {
      let orderData = get().CartItemData;
      const { data } = await axios.post("/order/create", {
        OrderData: orderData,
      });

      if (data.success) {
        alert("Order created Successfully");
        set({ CartItemData: [] });
      }
    } catch (err) {
      console.log("Got an Error", err);
      alert("Error");
    }
  },
  fetchUserOrder: async () => {
    try {
      const { data } = await axios.get("/order/getAllOrderUser");

      if (data.success) {
        // alert("Order Fetch Successfully");
        set({ orderData: data.orderData });
      }
    } catch (err) {
      console.log("Got an Error", err);
      alert("Error");
    }
  },
  fetchAdminOrder: async () => {
    try {
      const { data } = await axios.get("/order/getAllOrderAdmin");

      if (data.success) {
        set({ orderData: data.orderData });
        alert(data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  OrderStatusChange:async (orderid, OrderStatus) => {
        try {

          const {data} = await axios.post(`/order/chageStatus/${orderid}`,{
            status:OrderStatus
          })

          if(data.success){
            alert(data.message);
           await get().fetchAdminOrder();
          }

        } catch (error) {
            console.log("Error",error)
        }
  }
}));

export default OrderStore;