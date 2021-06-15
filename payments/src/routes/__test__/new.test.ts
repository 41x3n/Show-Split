import mongoose from "mongoose";
import request from "supertest";
import { OrderStatus } from "@showsplit/common";
import { app } from "../../app";
import { Order } from "../../models/order";
import { stripe } from "../../stripe";

jest.mock("../../__mocks__/stripe.ts");

it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "sdfsdffdgfd",
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns a 401 when purchasing an order that does not belong to the user", async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 10,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "sdfsdffdgfd",
      orderId: order.id,
    })
    .expect(401);
});

it("returns a 400 when purchasing a cancelled order", async () => {
  const userId = mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 10,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(userId))
    .send({
      token: "sdfsdffdgfd",
      orderId: order.id,
    })
    .expect(400);
});

// it("returns a 201 with valid inputs", async () => {
//   const userId = mongoose.Types.ObjectId().toHexString();

//   const order = Order.build({
//     id: mongoose.Types.ObjectId().toHexString(),
//     userId,
//     version: 0,
//     price: 10,
//     status: OrderStatus.Created,
//   });
//   await order.save();

//   await request(app)
//     .post("/api/payments")
//     .set("Cookie", global.signin(userId))
//     .send({
//       token: "card_1J1yMOSJ6okEYKUg6VQbwxxF",
//       orderId: order.id,
//     })
//     .expect(201);

//   const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];

//   expect(chargeOptions.source).toEqual("card_1J1yMOSJ6okEYKUg6VQbwxxF");
//   expect(chargeOptions.amount).toEqual(10 * 100);
//   expect(chargeOptions.currency).toEqual("INR");
// });
