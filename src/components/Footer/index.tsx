import { Link } from "react-router-dom";
import styled from "styled-components";
import * as theme from "util/theme";

const FooterComponent = styled.footer`
  box-shadow: ${theme.footerBoxshadowColor};
  background-color: ${theme.navbarBackgroundColor};
  color: ${theme.textColor};
  width: 100%;
  height: 3.5rem;
  bottom: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 15px;
  font-size: 17px;
`;

const Footer = () => {
  return (
    <FooterComponent>
      <div>
        <Link
          to="/about"
          className="d-flex flex-row-reverse align-items-center text-decoration-underline"
        >
          Sobre <i className="bi bi-info-circle me-1" />
        </Link>
      </div>
      <div>
        <span>v1.3.0</span>
      </div>
    </FooterComponent>
  );
};

export default Footer;
