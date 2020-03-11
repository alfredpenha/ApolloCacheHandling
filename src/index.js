import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";
import gql from "graphql-tag";

import AppWithHooks from "./AppWithHooks";
import AppWithComponents from "./AppWithComponents";

import "./index.css";

const GET_CURRENT_RESULT = gql`
  query getCurrentResult {
    currentResult @client {
      value
      __typename
    }
  }
`;

const cache = new InMemoryCache();

function updateResult(data) {
  cache.writeQuery({
    query: GET_CURRENT_RESULT,
    data
  });
}

updateResult({
  currentResult: {
    value: 0,
    __typename: "CurrentResult"
  }
});

const client = new ApolloClient({
  cache,
  resolvers: {
    Query: {
      currentResult() {
        const data = cache.readQuery({ query: GET_CURRENT_RESULT });
        return data.currentResult;
      }
    },
    Mutation: {
      performOperation(_root, { type }, { cache }) {
        const data = cache.readQuery({ query: GET_CURRENT_RESULT });
        if (type === "increment") {
          data.currentResult.value += 1;
        } else if (type === "square") {
          data.currentResult.value *= data.currentResult.value;
        } else if (type === "squareRoot") {
          data.currentResult.value = Math.sqrt(data.currentResult.value);
        }
        updateResult(data);
      },
      reset() {
        updateResult({
          currentResult: {
            value: 0,
            __typename: "CurrentResult"
          }
        });
      }
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppWithHooks />
    <AppWithComponents />
  </ApolloProvider>,
  document.getElementById("root")
);
