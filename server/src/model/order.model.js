import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    totalCartValue: {
      type: Number,
      required: true,
    },
    CartItem: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: Number,
      },
    ],
    status: {
      type: String,
      enum: {
        values: [
          "pending",
          "preparing",
          "outOfDelivery",
          "delivered",
          "cancelled",
        ],
        message: "{VALUE} is not supported",
        default: "pending",
        require: true,
      },
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const OrderModel = mongoose.model("order", OrderSchema);

export default OrderModel;