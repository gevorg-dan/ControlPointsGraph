import styled from "styled-components";

import { GraphControlPointMode } from "../../Enums";

const lineColors = {
  [GraphControlPointMode.unreached]: "#8690a4",
  [GraphControlPointMode.normal]: "#6085dd",
  [GraphControlPointMode.warn]: "#d0544f"
};

interface LineInterface {
  className?: string;
  lineStyle?: string;
  mode: GraphControlPointMode;
  growthRate?: number;
}

const Line = styled.span<LineInterface>`
  display: block;
  flex-grow: ${({ growthRate }) => growthRate};
  border-top: 1px ${({ lineStyle, mode }) => `${lineStyle} ${lineColors[mode]}`};
`;

Line.defaultProps = {
  lineStyle: "dashed",
  growthRate: 1
};

export const Bung = styled.span`
  display: block;
  flex-grow: 1;
  height: 5px;
  border-bottom: 1px dashed ${lineColors[GraphControlPointMode.unreached]};
`;

export default Line;
