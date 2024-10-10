import React, { useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_GOODS, GOODS_UPDATED } from "../queries/goods";

const GoodsList = () => {
  const [goodsList, setGoodsList] = useState([]);
  const { data: initialData, error: initialError } = useQuery(GET_GOODS);
  const { data: subscriptionData, error: subscriptionError } =
    useSubscription(GOODS_UPDATED);

  useEffect(() => {
    if (initialData && initialData.getAllGoods) {
      setGoodsList(initialData.getAllGoods);
    }
  }, [initialData]);

  useEffect(() => {
    if (subscriptionData && subscriptionData.goodsUpdated) {
      setGoodsList((prevGoodsList) => [
        ...prevGoodsList,
        subscriptionData.goodsUpdated,
      ]);
    }
  }, [subscriptionData]);

  if (initialError) return <p>Error: {initialError.message}</p>;
  if (subscriptionError) return <p>Error: {subscriptionError.message}</p>;

  return (
    <ul>
      {goodsList.map((goods) => (
        <li key={goods.id}>
          {goods.name} - {goods.description} - ${goods.price}
        </li>
      ))}
    </ul>
  );
};

export default GoodsList;
