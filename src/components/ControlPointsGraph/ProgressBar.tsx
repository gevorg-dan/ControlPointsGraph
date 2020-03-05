import React from "react";
import styled from "styled-components";

const ProgressBar = (props: {
  className?: string;
  borderStyle?: string;
  borderColor: string;
  flexGrow?: number;
}) => <span className={props.className} />;

const StyledProgressBar = styled(ProgressBar)`
  display: block;
  flex-grow: ${({ flexGrow }) => flexGrow};
  border-top: 1px
    ${({ borderStyle, borderColor }) => `${borderStyle} ${borderColor}EE`};
  z-index: 2;
`;

StyledProgressBar.defaultProps = {
  borderStyle: "dashed",
  flexGrow: 1
};

export default StyledProgressBar;
