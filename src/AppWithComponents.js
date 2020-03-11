import React, { Fragment } from "react";
import { Mutation, Query } from "@apollo/react-components";

import { PERFORM_OPERATION, RESET, GET_CURRENT_RESULT } from "./common";

function App() {
  return (
    <div className="app-components">
      <h2>Example Using Components</h2>
      <Mutation mutation={PERFORM_OPERATION}>
        {(performOperation, { loading }) => (
          <Fragment>
            <Query query={GET_CURRENT_RESULT}>
              {({ data }) => (
                <p>
                  {loading
                    ? "Loading ..."
                    : `Value: ${
                        data && data.currentResult
                          ? data.currentResult.value
                          : 0
                      }`}
                </p>
              )}
            </Query>
            <p>
              <button
                onClick={() =>
                  performOperation({ variables: { type: "increment" } })
                }
              >
                Increment
              </button>
              <button
                onClick={() =>
                  performOperation({ variables: { type: "square" } })
                }
              >
                Square
              </button>
              <button
                onClick={() =>
                  performOperation({ variables: { type: "squareRoot" } })
                }
              >
                Square Root
              </button>
            </p>
          </Fragment>
        )}
      </Mutation>

      <Mutation mutation={RESET}>
        {reset => (
          <p>
            <button onClick={() => reset()}>Reset</button>
          </p>
        )}
      </Mutation>
    </div>
  );
}

export default App;
