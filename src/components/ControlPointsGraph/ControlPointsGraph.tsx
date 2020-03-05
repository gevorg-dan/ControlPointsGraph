import React, { useMemo } from "react";
import styled from "styled-components";

import ControlPoint from "./ControlPoint";

type PointsType = { mode: GraphControlPointMode; value: number };

export enum GraphControlPointMode {
  normal = "normal",
  unreached = "unreached",
  warn = "warn"
}

export const controlPointsTheme = {
  [GraphControlPointMode.unreached]: "#8F9AAE",
  [GraphControlPointMode.normal]: "#608FE7",
  [GraphControlPointMode.warn]: "#DB5550"
};

const getNextPointAfterCurrent: (
  points: PointsType[],
  currentValue: number
) => PointsType = (points, currentValue) => {
  const result = points.filter(point => point.value > currentValue);
  if (result.length === 0) {
    return points[points.length - 1];
  }
  return result[0];
};

const sortingPointsByValue: (points: PointsType[]) => PointsType[] = points =>
  [...points].sort((a, b) => a.value - b.value);

function ControlPointsGraph(props: {
  className?: string;
  points: PointsType[];
  value: number;
}) {
  const { className, points, value: currentValue } = props;
  const sortedPoints = useMemo(() => sortingPointsByValue(points), [points]);
  const nextPointAfterCurrent = useMemo(
    () => getNextPointAfterCurrent(sortedPoints, currentValue),
    [currentValue, sortedPoints]
  );
  const firstPoint = sortedPoints[0];
  const lastPoint = sortedPoints[sortedPoints.length - 1];

  return (
    <div className={className}>
      {sortedPoints.map(({ mode, value }, index, points) => {
        const nextPoint = points[index + 1] ? points[index + 1] : lastPoint;
        const progressBarColor =
          controlPointsTheme[
            value > currentValue ? nextPointAfterCurrent.mode : mode
          ];
        return (
          <ControlPoint
            mode={mode}
            progressBarStyle={value < currentValue ? "solid" : undefined}
            progressBarColor={progressBarColor}
            currentProgressBarColor={
              controlPointsTheme[nextPointAfterCurrent.mode]
            }
            value={value}
            currentValue={currentValue}
            currentValueIn={
              currentValue >= value && currentValue < nextPoint.value
            }
            key={index}
            maxOffset={lastPoint.value - firstPoint.value}
            nextPointValue={nextPoint.value}
          />
        );
      })}
      {sortedPoints.length === 0 && <Bung />}
    </div>
  );
}

const Bung = styled.span`
  display: block;
  flex-grow: 1;
  height: 5px;
  border-bottom: 1px dashed
    ${controlPointsTheme[GraphControlPointMode.unreached]};
`;

export default styled(ControlPointsGraph)`
  display: flex;
  width: 100%;
  height: auto;
`;
