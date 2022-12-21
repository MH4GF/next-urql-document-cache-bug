import { useCallback } from "react";
import { gql, useQuery, useMutation } from "urql";

const orderQuery = gql`
  query getOrder {
    order {
      id
      name
    }
  }
`;

const createOrderMutation = gql`
  mutation createOrder {
    order {
      name
    }
  }
`;

const updateOrderMutation = gql`
  mutation updateOrder {
    order {
      id
    }
  }
`;

const CreateButton = ({ data }) => {
  const disabled = data == null || data.order != null;
  const [, create] = useMutation(createOrderMutation);
  const handleClick = useCallback(() => {
    create();
  }, [create]);
  return (
    <button disabled={disabled} onClick={handleClick}>
      create mutation
    </button>
  );
};

const UpdateButton = ({ data }) => {
  const disabled = data?.order == null;
  const [, update] = useMutation(updateOrderMutation);
  const handleClick = useCallback(() => {
    update();
  }, [update]);
  return (
    <button disabled={disabled} onClick={handleClick}>
      update mutation
    </button>
  );
};

const context = {
  additionalTypenames: ["Order"],
  requestPolicy: "network-only",
};

/**
 * MSW's mocked GraphQL response returns null the first time, data the second and subsequent times
 * Check that pressing createButton causes mutation and additionalTypeNames causes cache invalidate.
 */
export const OrderDetail = () => {
  const [{ data }, refetch] = useQuery({
    query: orderQuery,
    context,
  });

  return (
    <div>
      <p>order name: {data?.order?.name}</p>
      <button onClick={() => refetch()}>refetch order</button>
      <CreateButton data={data} />
      <UpdateButton data={data} />
    </div>
  );
};
