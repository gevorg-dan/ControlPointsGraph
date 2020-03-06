import styled from "styled-components";

import { GraphControlPointMode } from "../../Enums";

const circleColors = {
  [GraphControlPointMode.unreached]: "#8F9AAE",
  [GraphControlPointMode.normal]: "#608FE7",
  [GraphControlPointMode.warn]: "#DB5550"
};

interface CircleInterface {
  className?: string;
  mode: GraphControlPointMode;
}

export default styled.i<CircleInterface>`
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid ${({ mode }) => circleColors[mode]};
`;
