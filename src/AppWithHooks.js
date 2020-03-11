import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { PERFORM_OPERATION, RESET, GET_CURRENT_RESULT } from "./common";

function App() {
  const [performOperation, { loading }] = useMutation(PERFORM_OPERATION);
  const [reset] = useMutation(RESET);
  const { data } = useQuery(GET_CURRENT_RESULT);

  return (
    <div className="app-hooks">
      <h2>Example Using Hooks</h2>
      <p>
        {loading
          ? "Loading ..."
          : `Value: ${
              data && data.currentResult ? data.currentResult.value : 0
            }`}
      </p>
      <p>
        <button
          onClick={() => performOperation({ variables: { type: "increment" } })}
        >
          Increment
        </button>
        <button
          onClick={() => performOperation({ variables: { type: "square" } })}
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
      <p>
        <button onClick={() => reset()}>Reset</button>
      </p>
    </div>
  );
}

export default App;
