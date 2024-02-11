import styled from "@emotion/styled";

const Input = styled.input`
  outline: none;
  background-color: transparent;
  border: 1px solid grey;
  font-size: inherit;
  padding: 0.8rem 1.5rem;
  color: inherit;
  font-family: inherit;
  border-radius: 1rem;
  border-color: ${(props) => (props.error ? "red" : "grey")};

  &:focus {
    border-color: ${(props) => (props.error ? "red" : "blue")};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export default Input;
