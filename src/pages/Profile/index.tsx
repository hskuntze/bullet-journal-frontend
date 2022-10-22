import { AuthContext } from "AuthContext";
import { useContext, useEffect, useState } from "react";
import { ProfileType } from "types/ProfileType";
import { getTokenData, Role } from "util/auth";
import styled from "styled-components";
import * as theme from "util/theme";

const ProfileCard = styled.div`
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  margin: 15px 0px;
  background-color: ${theme.cardColor};
  border: 4px solid ${theme.navbarBackgroundColor};

  & span {
    margin: 5px 0;
    font-weight: 700;
  }
`;

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType>();
  const { authContextData } = useContext(AuthContext);

  useEffect(() => {
    if (authContextData.authenticated) {
      let pr = getTokenData();
      setProfile(pr);
    }
  }, [authContextData.authenticated]);

  const handleAuthType = (roles: Role[] | undefined) => {
    if (roles !== undefined) {
      let role = roles[roles.length - 1];
      const textByAuth = {
        ROLE_VISITOR: "Visitante",
        ROLE_USER: "Usuário",
        ROLE_ADMIN: "Administrador",
      };

      return textByAuth[role];
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <ProfileCard>
        <div className="mx-auto">
          <i className="bi bi-person-badge" style={{ fontSize: "40px"}} />
        </div>
        <span>
          Nome de usuário:&nbsp;
          <span className="fw-light">{profile?.user_name}</span>
        </span>
        <span>
          Autorização:&nbsp;
          <span className="fw-light">
            {handleAuthType(profile?.authorities)}
          </span>
        </span>
      </ProfileCard>
    </div>
  );
};

export default Profile;
