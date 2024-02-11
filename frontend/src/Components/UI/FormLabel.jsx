import styled from "@emotion/styled";

const StyledFormLabel = styled.label`
  font-weight: 600;
  font-size: 1.6rem;
`;

const FormLabel = ({ children, id }) => {
  return <StyledFormLabel htmlFor={id}>{children}</StyledFormLabel>;
};

export default FormLabel;
