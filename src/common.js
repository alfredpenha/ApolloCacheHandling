import gql from "graphql-tag";

export const PERFORM_OPERATION = gql`
  mutation performOperation($type: String!) {
    performOperation(type: $type) @client
  }
`;

export const RESET = gql`
  mutation reset {
    reset @client
  }
`;

export const GET_CURRENT_RESULT = gql`
  query getCurrentResult {
    currentResult @client {
      value
      __typename
    }
  }
`;
