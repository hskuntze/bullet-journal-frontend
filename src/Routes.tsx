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
import Streaks from "pages/Streaks";
import Footer from "components/Footer";
import PrivateRoute from "PrivateRoute";

const Wrapper = styled.div`
  background-color: ${themeConf.backgroundColor};
  color: ${themeConf.textColor};
  min-height: 100vh;
  position: relative;
`;

const Content = styled.div`
  padding-bottom: 3.5rem;
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
          <Content>
            <Switch>
              <Route path="/" element={<Home />} />
              <Route path="/auth/*" element={<Auth />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute
                    roles={["ROLE_VISITOR", "ROLE_USER", "ROLE_ADMIN"]}
                  >
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cards/*"
                element={
                  <PrivateRoute
                    roles={["ROLE_VISITOR", "ROLE_USER", "ROLE_ADMIN"]}
                  >
                    <Cards />
                  </PrivateRoute>
                }
              />
              <Route
                path="/to-dos/*"
                element={
                  <PrivateRoute
                    roles={["ROLE_VISITOR", "ROLE_USER", "ROLE_ADMIN"]}
                  >
                    <Todos />
                  </PrivateRoute>
                }
              />
              <Route
                path="/streaks/*"
                element={
                  <PrivateRoute
                    roles={["ROLE_VISITOR", "ROLE_USER", "ROLE_ADMIN"]}
                  >
                    <Streaks />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
            </Switch>
          </Content>
          <Footer />
        </Wrapper>
      </ThemeProvider>
    </CustomRouter>
  );
};

export default Routes;
