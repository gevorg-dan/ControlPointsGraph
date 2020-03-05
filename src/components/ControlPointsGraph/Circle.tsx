import React from "react";
import styled from "styled-components";

import {
  controlPointsTheme,
  GraphControlPointMode
} from "./ControlPointsGraph";

const Circle = (props: {
  className?: string;
  mode: GraphControlPointMode;
}) => <i className={props.className} />;

export default styled(Circle)`
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid ${({ mode }) => controlPointsTheme[mode]};
  z-index: 2;
`;
