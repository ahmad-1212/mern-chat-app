import styled from "@emotion/styled";

const StyledUserAvatar = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-position: cover;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const UserAvatar = ({ width, height, src }) => {
  return (
    <StyledUserAvatar width={width} height={height}>
      <Img src={src} />
    </StyledUserAvatar>
  );
};

export default UserAvatar;
