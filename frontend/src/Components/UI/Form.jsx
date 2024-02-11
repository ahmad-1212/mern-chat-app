import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) => props.gap};
  font-size: 1.6rem;
`;

Form.defaultProps = {
  gap: "3rem",
  direction: "column",
};

export default Form;
