import { graphql } from "msw";

const orderData = {
  id: "1",
  name: "Order 1",
  __typename: "Order",
};

const orderNewHandler = graphql.query("getOrder", (req, res, ctx) => {
  console.log("orderNewHandler");
  return res.once(
    ctx.data({
      order: null,
    })
  );
});

const orderExistsHandler = graphql.query("getOrder", (req, res, ctx) => {
  console.log("orderExistsHandler");
  return res(
    ctx.data({
      order: orderData,
    })
  );
});

const createOrderHandler = graphql.mutation("createOrder", (req, res, ctx) => {
  console.log("createOrderHandler");
  return res(
    ctx.data({
      order: orderData,
    })
  );
});

const updateOrderHandler = graphql.mutation("updateOrder", (req, res, ctx) => {
  console.log("updateOrderHandler");
  return res(
    ctx.data({
      order: orderData,
    })
  );
});

export const handlers = [
  orderNewHandler,
  orderExistsHandler,
  createOrderHandler,
  updateOrderHandler,
];
