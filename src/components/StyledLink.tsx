import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

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
