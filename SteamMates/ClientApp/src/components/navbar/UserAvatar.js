import React, { useContext } from "react";
import styled, { css } from "styled-components";
import FriendContext from "../../contexts/FriendContext";
import no_user from "../../static/images/no_user.png";

const Avatar = styled.img`
  display: block;
  width: 45px;
  height: 45px;

  ${props =>
    props.noAvatar &&
    css`
      filter: brightness(50%);
    `}
`;

const Remove = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  display: none;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: #ff0000;
`;

const Wrapper = styled.div`
  margin-left: 2px;
  padding: 2px;
  cursor: pointer;
  
  ${props =>
    (props.isUser &&
      css`
        border: 2px solid rgba(240, 243, 43, 0.81);
      `) ||
    css`
      border: 1px solid rgba(148, 92, 47, 0.81);

      &:hover {
        filter: brightness(50%);
      }
    `}
  
  &:hover ${Remove} {
    display: block;
  }
`;

const UserAvatar = ({ profile, isFriend }) => {
  const { removeFriend } = useContext(FriendContext);

  const handleClick = () => {
    if (isFriend) {
      removeFriend(profile);
    }
  };

  return (
    <Wrapper onClick={handleClick} isUser={profile && !isFriend}>
      <Avatar
        noAvatar={!profile}
        src={profile ? profile.avatarMedium : no_user}
        alt="Avatar"
      />
      {isFriend && profile.avatarMedium && <Remove>X</Remove>}
    </Wrapper>
  );
};

export default UserAvatar;
