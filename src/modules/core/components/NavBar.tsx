import React, {FC, MouseEvent, useState} from 'react';
import {AppBar, IconButton, LinearProgress, Menu, Toolbar} from "@material-ui/core";
import styled from "@emotion/styled";

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from "@material-ui/icons/Settings";

import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import MenuItemThemeButton from "../../shared/components/MenuItemThemeButton";
import {themeSpacing} from "../styles/GlobalStyles";
import {setDrawerMinimised} from "../../../redux/slices/userInterfaceSlice";
import LogoDense from "../../shared/components/LogoDense";
import WindowBar from "./WindowBar";

const StyledAppBar = styled(AppBar)`
  width: 100vw;
`

const StyledToolbar = styled(Toolbar)`
  padding: 0 ${themeSpacing(2)};
`

const StyledSettingsWrap = styled.div`
  margin-left: auto;
`;

const StyledLinearProgress = styled(LinearProgress)`
  position: absolute;
  width: 100vw;
  bottom: -0px;
  left: -${themeSpacing(2)};
`

const NavBar: FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsAnchor, setSettingsAnchor] = useState<Element | undefined>(undefined);

  const dispatch = useAppDispatch();
  const {drawerMinimised, isLoading} = useAppSelector(state => state.userInterface);

  const handleToggleLeftDrawer = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(setDrawerMinimised(!drawerMinimised));
  };

  const handleOpenSettings = (e: MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchor(e.currentTarget);
    setSettingsOpen(true);
  };

  const handleCloseSettings = (e: MouseEvent<HTMLButtonElement>) => {
    setSettingsOpen(false);
  };

  return <StyledAppBar sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} position="sticky">
      <WindowBar/>
      <StyledToolbar disableGutters>
        <IconButton onClick={handleToggleLeftDrawer}>
          <MenuIcon/>
        </IconButton>
        <LogoDense style={{marginLeft: "10px"}}/>
        <StyledSettingsWrap>
          <IconButton onClick={handleOpenSettings}><SettingsIcon/></IconButton>
          <Menu open={settingsOpen} anchorEl={settingsAnchor} onClose={handleCloseSettings}>
            <MenuItemThemeButton/>
          </Menu>
        </StyledSettingsWrap>
        {isLoading && <StyledLinearProgress color={"secondary"} variant={"indeterminate"}/>}
      </StyledToolbar>
    </StyledAppBar>;
}

export default NavBar;