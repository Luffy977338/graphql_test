import { gql } from "@apollo/client";

export const GET_GOODS = gql`
  {
    getAllGoods {
      id
      name
      description
      price
    }
  }
`;

export const CREATE_GOODS = gql`
  mutation createGoods($name: String!, $description: String!, $price: Float!) {
    createGoods(name: $name, description: $description, price: $price) {
      id
      name
      description
      price
    }
  }
`;

export const GOODS_UPDATED = gql`
  subscription GOODS_UPDATED {
    goodsUpdated {
      id
      name
      description
      price
    }
  }
`;
