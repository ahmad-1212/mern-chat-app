import styled from "@emotion/styled";

const StyledFormRowVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};
`;

const Error = styled.span`
  font-size: 1rem;
  color: red;
`;

StyledFormRowVertical.defaultProps = {
  gap: "1rem",
};

const FormRowVertical = ({ children, error, ...props }) => {
  return (
    <StyledFormRowVertical {...props}>
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRowVertical>
  );
};

export default FormRowVertical;
