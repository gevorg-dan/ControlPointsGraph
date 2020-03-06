import { GraphControlPointMode } from "../../Enums";
import { PointsType } from "./ControlPointsGraph";

export const getLineStyles = (
  pointValue: number,
  currentValue: number,
  {
    mode,
    nextPointMode
  }: { mode: GraphControlPointMode; nextPointMode: GraphControlPointMode }
) =>
  pointValue < currentValue
    ? { mode, border: "solid" }
    : { mode: nextPointMode };

export const isPointValueInInterval = (
  value: number,
  [from, to]: [number, number]
) => value >= from && value < to;

export const getIntervalBasis = (
  [from, to]: [number, number],
  deltaValue: number
): number => ((to - from) * 100) / deltaValue;

export const getNextPoint = (points: PointsType[], index: number) =>
  points[index + 1];

export const getPointAfterValue = (points: PointsType[], value: number) =>
  points.find(point => point.value > value);

export const sortingPointsByValue = (points: PointsType[]) =>
  [...points].sort((a, b) => a.value - b.value);
