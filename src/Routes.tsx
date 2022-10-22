import { Routes as Switch, Route } from "react-router-dom";
import { CustomRouter } from "CustomRouter";
import styled, { ThemeProvider } from "styled-components";
import { useContext } from "react";
import Navbar from "components/Navbar";
import Home from "pages/Home";
import Subnav from "components/Subnav";
import history from "util/navigate";
import * as themeConf from "./util/theme";
import Auth from "pages/Auth";
import Cards from "pages/Cards";
import Todos from "pages/Todos";
import { ManageThemeContext } from "ThemeManager";
import ComponentTitle from "components/ComponentTitle";
import Profile from "pages/Profile";
import About from "pages/About";

const Wrapper = styled.div`
  background-color: ${themeConf.backgroundColor};
  color: ${themeConf.textColor};
  min-height: 100vh;
`;

const Routes = () => {
  const th = useContext(ManageThemeContext);

  return (
    <CustomRouter history={history}>
      <ThemeProvider theme={{ mode: th.mode }}>
        <Wrapper>
          <Navbar />
          <Subnav />
          <ComponentTitle />
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cards/*" element={<Cards />} />
            <Route path="/to-dos/*" element={<Todos />} />
            <Route path="/about" element={<About />} />
          </Switch>
        </Wrapper>
      </ThemeProvider>
    </CustomRouter>
  );
};

export default Routes;
