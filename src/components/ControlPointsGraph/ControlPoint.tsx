import React from "react";
import styled from "styled-components";

import Circle from "./Circle";
import ProgressBar from "./ProgressBar";
import ProgressBarWithCurrentValue from "./ProgressBarWithCurrentValue";

import { GraphControlPointMode } from "./ControlPointsGraph";

const getFlexGrow: (
  value: number,
  maxValue: number,
  nextValue: number,
  currentValue?: number
) => number = (value, maxValue, nextValue, currentValue) => {
  if (currentValue) {
    return (currentValue - value) / (nextValue - value);
  }
  if (value === maxValue) {
    return value / maxValue;
  }
  return (nextValue - value) / maxValue;
};

export interface ControlPointInterface {
  className?: string;
  progressBarStyle?: string;
  progressBarColor: string;
  mode: GraphControlPointMode;
  value: number;
  currentProgressBarColor: string;
  currentValueIn: boolean;
  currentValue: number;
  maxOffset: number;
  nextPointValue: number;
}

function ControlPoint({
  className,
  mode,
  value,
  currentValue,
  currentValueIn,
  currentProgressBarColor,
  progressBarStyle,
  progressBarColor,
  nextPointValue
}: ControlPointInterface) {
  return (
    <div className={className}>
      <Circle mode={mode} />
      {currentValueIn ? (
        <ProgressBarWithCurrentValue
          progressBarStyle={progressBarStyle}
          progressBarColor={progressBarColor}
          currentProgressBarColor={currentProgressBarColor}
          flexGrow={getFlexGrow(value, 0, nextPointValue, currentValue)}
        />
      ) : (
        <ProgressBar
          borderStyle={progressBarStyle}
          borderColor={progressBarColor}
        />
      )}
    </div>
  );
}

export default styled(ControlPoint)`
  display: flex;
  align-items: center;
  position: relative;
  order: ${({ value }) => value};
  flex-grow: ${({ value, maxOffset, nextPointValue }) =>
    getFlexGrow(value, maxOffset, nextPointValue)};
`;
