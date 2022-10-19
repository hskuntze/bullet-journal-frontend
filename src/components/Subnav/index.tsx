import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "AuthContext";
import { removeAuthData } from "util/storage";
import { useEffect } from "react";
import { getTokenData, isAuthenticated } from "util/auth";
import navigate from "util/navigate";
import "./styles.css";

const Subnav = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    navigate.replace("/");
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  return (
    <nav className="navbar">
      <div className="sub-nav">
        {authContextData.authenticated ? (
          <>
            <div className="subnav-item">
              <a href="logout" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right" style={{ color: "red" }} />
                <span className="subnav-link">Logout</span>
              </a>
            </div>
            <div className="subnav-item">
              <Link to="/profile">
                <i className="bi bi-person-badge" style={{ color: "green" }} />
                <span className="subnav-link">Perfil</span>
              </Link>
            </div>
          </>
        ) : (
          <button type="button">
            <div className="subnav-item">
              <Link to="/auth">
                <i className="bi bi-person-badge" />
                <span className="subnav-link">Login</span>
              </Link>
            </div>
          </button>
        )}
        {authContextData.authenticated ? (
          <>
            <button type="button">
              <div className="subnav-item">
                <Link to="/to-dos">
                  <i className="bi bi-check2-square" />
                  <span className="subnav-link">To-dos</span>
                </Link>
              </div>
            </button>
            <button type="button">
              <div className="subnav-item">
                <Link to="/cards">
                  <i className="bi bi-journal-text" />
                  <span className="subnav-link">Cards</span>
                </Link>
              </div>
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Subnav;
