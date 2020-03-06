import React, { ReactNode } from "react";
import styled from "styled-components";

function Wrapper({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
  basis?: number;
}) {
  return <div className={className}>{children}</div>;
}

export default styled(Wrapper)`
  display: flex;
  align-items: center;
  flex-basis: ${({ basis }) => basis}%;
`;
