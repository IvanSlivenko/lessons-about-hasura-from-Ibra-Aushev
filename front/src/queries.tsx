import { gql } from "@apollo/client";

export const GET_ALL_ITEMS = gql`
  query GetAllItems($searchValue: String!) {
    items(where: { title: { _ilike: $searchValue } }) {
      id
      imageUrl: image_url
      price
      title
    }
  }
`;

export const GET_CART = gql`
  query MyQuery {
    cart {
      id
      quantity
      sneaker: item {
        id
        imageUrl: image_url
        price
        title
      }
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation MyMutation($sneaker_id: uuid) {
    delete_cart(where: { sneaker_id: { _eq: $sneaker_id } }) {
      affected_rows
    }
    insert_cart_one(object: { quantity: 1, sneaker_id: $sneaker_id }) {
      id
    }
  }
`;

