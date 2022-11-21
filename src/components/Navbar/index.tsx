import { NavLink } from "react-router-dom";
import { useTheme } from "ThemeManager";
import * as themeConf from "util/theme";
import styled from "styled-components";
import "./styles.css";
import "bootstrap/js/src/collapse.js";

const NavbarComponent = styled.nav`
  background-color: ${themeConf.navbarBackgroundColor};
  color: ${themeConf.textColor};
  box-shadow: ${themeConf.navbarBoxshadowColor};
`;

const Navbar = () => {
  const theme = useTheme();

  return (
    <NavbarComponent>
      <nav className="navbar navbar-expand-md sticky-top custom-nav">
        <div className="container-fluid me-auto">
          <NavLink to="/">
            <h1 className="navbar-title">The Bullet Journal</h1>
          </NavLink>
          <button type="button" onClick={() => theme.toggle()}>
            <i className="bi bi-brightness-high-fill me-4" />
          </button>
        </div>
      </nav>
    </NavbarComponent>
  );
};

export default Navbar;
