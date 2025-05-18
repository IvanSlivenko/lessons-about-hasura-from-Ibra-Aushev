import { gql } from "@apollo/client";

export const GET_ALL_ITEMS = gql`
  query GetAllItems {
    items {
      id
      image_url
      price
      title
    }
  }
`;
