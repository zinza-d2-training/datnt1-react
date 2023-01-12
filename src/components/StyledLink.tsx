import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

type StyledLinkProps = {
  children: JSX.Element;
  to: string;
};

const StyleLink = styled(Link)`
  text-decoration: none;
`;

const StyledLink = ({ children, to }: StyledLinkProps) => {
  return <StyleLink to={to}>{children}</StyleLink>;
};

export default StyledLink;
