import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GOODS, GET_GOODS } from "../queries/goods";

const CreateGoods = () => {
  const [createGoods, { loading, error }] = useMutation(CREATE_GOODS, {
    refetchQueries: [{ query: GET_GOODS }],
  });

  return (
    <button
      onClick={() =>
        createGoods({
          variables: { name: "test", description: "еуыва", price: 100 },
        })
      }
    >
      Create
    </button>
  );
};

export default CreateGoods;
