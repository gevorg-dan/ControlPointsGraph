import React, { useMemo } from "react";
import styled from "styled-components";

import Circle from "./Circle";
import Line, { Bung } from "./Line";
import Wrapper from "./Wrapper";

import {
  getIntervalBasis,
  getLineStyles,
  getNextPoint,
  getPointAfterValue,
  isPointValueInInterval,
  sortingPointsByValue
} from "./controlPointsGraphHelpers";

import { GraphControlPointMode } from "../../Enums";

export type PointsType = { mode: GraphControlPointMode; value: number };

function ControlPointsGraph(props: {
  className?: string;
  points: PointsType[];
  value: number;
}) {
  const { className, points: pointsProp, value: currentValue } = props;
  const points = useMemo(() => sortingPointsByValue(pointsProp), [pointsProp]);
  const nextPointAfterValue = useMemo(
    () => getPointAfterValue(points, currentValue),
    [currentValue, points]
  );
  const deltaValue = points[points.length - 1].value - points[0].value;

  return (
    <div className={className}>
      {points.map(({ mode, value }, index, points) => {
        const nextPoint = getNextPoint(points, index);

        if (!nextPoint) {
          return (
            <Wrapper key={index}>
              <Circle mode={mode} />
            </Wrapper>
          );
        }

        const nextPointAfterValueMode = nextPointAfterValue
          ? nextPointAfterValue.mode
          : mode;
        const lineStyles = getLineStyles(value, currentValue, {
          mode,
          nextPointMode: nextPointAfterValueMode
        });

        const lineGrowthRate =
          getIntervalBasis([value, currentValue], nextPoint.value - value) /
          100;

        return (
          <Wrapper
            key={index}
            basis={getIntervalBasis([value, nextPoint.value], deltaValue)}
          >
            <Circle mode={mode} />
            {isPointValueInInterval(currentValue, [value, nextPoint.value]) ? (
              <>
                <Line
                  lineStyle="solid"
                  mode={lineStyles.mode}
                  growthRate={lineGrowthRate}
                />
                <Line mode={nextPointAfterValueMode} growthRate={1 - lineGrowthRate} />
              </>
            ) : (
              <Line lineStyle={lineStyles.border} mode={lineStyles.mode} />
            )}
          </Wrapper>
        );
      })}
      {points.length === 0 && <Bung />}
    </div>
  );
}

export default styled(ControlPointsGraph)`
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
`;
