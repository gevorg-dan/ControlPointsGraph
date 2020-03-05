import React from "react";

import ProgressBar from "./ProgressBar";

interface ProgressBarWithCurrentValueInterface {
  progressBarStyle?: string;
  progressBarColor: string;
  currentProgressBarColor: string;
  flexGrow: number;
}

function ProgressBarWithCurrentValue({
  progressBarStyle,
  progressBarColor,
  currentProgressBarColor,
  flexGrow
}: ProgressBarWithCurrentValueInterface) {
  const flexGrowWithoutZero = flexGrow === 0 ? 0.0001 : flexGrow;

  return (
    <>
      <ProgressBar
        borderStyle={progressBarStyle}
        borderColor={progressBarColor}
        flexGrow={flexGrowWithoutZero}
      />
      <ProgressBar
        borderColor={currentProgressBarColor}
        flexGrow={1 - flexGrowWithoutZero}
      />
    </>
  );
}

export default ProgressBarWithCurrentValue;
