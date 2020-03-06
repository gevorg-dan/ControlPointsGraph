import React from "react";
import styled from "styled-components";

import ControlPointsGraph from "./components/ControlPointsGraph/ControlPointsGraph";

import { GraphControlPointMode } from "./Enums";

function App({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h3> Контрольные точки</h3>
      <ControlPointsGraph
        points={[
          { mode: GraphControlPointMode.normal, value: 40 },
          { mode: GraphControlPointMode.unreached, value: 130 },
          { mode: GraphControlPointMode.warn, value: 80 },
          { mode: GraphControlPointMode.warn, value: 70 },
          {
            mode: GraphControlPointMode.normal,
            value: 10
          },
          { mode: GraphControlPointMode.normal, value: 20 },
          { mode: GraphControlPointMode.normal, value: 200 }
        ]}
        value={90}
      />
    </div>
  );
}

export default styled(App)`
  display: flex;
  h3 {
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
  flex-direction: column;
  padding: 20px;
`;
