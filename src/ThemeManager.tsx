import React from "react";

export type ThemeContext = {
  mode: string;
  toggle(): void;
};

const defaultMode = "dark";

export const ManageThemeContext: React.Context<ThemeContext> =
  React.createContext({
    mode: defaultMode,
    toggle: () => {},
  });

export const useTheme = () => React.useContext(ManageThemeContext);

export const ThemeManager: React.FC = ({ children }) => {
  const [themeState, setThemeState] = React.useState({
    mode: defaultMode,
  });

  const toggle = (): void => {
    setThemeState({ mode: themeState.mode === "light" ? `dark` : `light` });
    localStorage.setItem("theme", themeState.mode);
  };

  return (
    <ManageThemeContext.Provider
      value={{
        mode: localStorage.getItem("theme") || "dark",
        toggle: toggle,
      }}
    >
      {children}
    </ManageThemeContext.Provider>
  );
};
