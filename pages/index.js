import React from "react";
import { withUrqlClient } from "next-urql";
import { setupWorker } from "msw";
import { handlers } from "../mocks/handlers";
import { OrderDetail } from "../components/OrderDetail";
import { devtoolsExchange } from "@urql/devtools";
import { defaultExchanges } from "urql";

if (typeof window !== "undefined") {
  const worker = setupWorker(...handlers);
  worker.start();
}

const Home = () => <OrderDetail />;

export default withUrqlClient(() => ({
  url: "https://example.com/graphql",
  exchanges: [devtoolsExchange, ...defaultExchanges],
}))(Home);
