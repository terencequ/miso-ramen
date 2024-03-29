import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import NavBar from "./modules/core/components/NavBar";
import {CssBaseline} from "@material-ui/core";
import {Theme, ThemeProvider} from "@material-ui/core/styles";
import styled from "@emotion/styled";
import {useAppSelector} from "./redux/hooks";
import createAppTheme from "./theme";
import NavDrawer, {drawerMinimisedWidth, drawerWidth} from "./modules/core/components/NavDrawer";
import {themeSpacing} from "./modules/core/styles/GlobalStyles";

const StyledRoot = styled.div`
  background-image: ${() => {
    return useAppSelector(state => state.userInterface.currentBackground);
  }};
  background-size: 100%;
`

interface StyledBodyProps {
  drawerOpen: boolean;
  drawerMinimised: boolean;
}

const getDrawerWidth = (props: StyledBodyProps) => {
  let currentDrawerWidth = props.drawerOpen ? props.drawerMinimised ? drawerMinimisedWidth : drawerWidth : 0;
  return currentDrawerWidth+"px"
}

const StyledBody = styled.div<StyledBodyProps>`
  min-height: 100vh;
  padding: ${themeSpacing(8)} 0;
  margin-right: auto;
  margin-left: ${getDrawerWidth};
  width: calc(100% - ${getDrawerWidth});
  transition: ${props => {
    const theme = props.theme as Theme;
    return theme.transitions.create(['margin', 'width'], { // Enter screen animation
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        })
  }}};
`;

const App = () => {
  const darkMode = useAppSelector(state => state.userInterface.darkMode);
  const theme = createAppTheme(darkMode);

  document.title = "Oat Milk";
  const {drawerOpen, drawerMinimised} = useAppSelector(state => state.userInterface);

  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <StyledRoot>
          <NavBar/>
          <NavDrawer anchor={"left"}/>
          <StyledBody drawerOpen={drawerOpen} drawerMinimised={drawerMinimised}>
            <Switch>
              <Route path={"/"}>
              </Route>
            </Switch>
          </StyledBody>
        </StyledRoot>
      </Router>
    </ThemeProvider>
  </>;
};

export default App;
