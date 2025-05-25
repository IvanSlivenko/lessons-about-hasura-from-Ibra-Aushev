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
      price
      sneaker: item {
        id
        image_url
        price
        title
      }
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation MyMutation($sneaker_id: uuid, $quantity: Int!, $price: Int!) {
    delete_cart(where: { sneaker_id: { _eq: $sneaker_id } }) {
      affected_rows
    }
    insert_cart_one(
      object: { quantity: $quantity, sneaker_id: $sneaker_id, price: $price }
    ) {
      id
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($sneaker_id: uuid) {
    delete_cart(where: { sneaker_id: { _eq: $sneaker_id } }) {
      affected_rows
    }
  }
`;

export const ADD_TO_FAVORITE = gql`
  mutation AddToFavorites($sneaker_id: uuid!) {
    delete_favorites(where: { sneaker_id: { _eq: $sneaker_id } }) {
      affected_rows
    }
    insert_favorites_one(object: { sneaker_id: $sneaker_id }) {
      id
    }
  }
`;

export const GET_ALL_FAVORITES = gql`
  query getallFavorites {
    favorites {
      id
      sneaker_id
    }
  }
`;
