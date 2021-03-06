import {Typography} from "@material-ui/core";
import React, {CSSProperties, FC} from "react";
import styled from "@emotion/styled";

const StyledLogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const StyledLogo = styled.img`
  max-height: 96px;
  max-width: 96px;
`;

const StyledLogoText = styled(Typography)`
  font-family: "Josefin Slab", "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 2.4rem;
  padding-top: 0.2rem;
`;

const Logo: FC<{style?: CSSProperties}> = ({style}) => {

    return <StyledLogoWrap style={style}>
        <StyledLogo src={'./images/logo.png'}/>
        <StyledLogoText variant={"h4"}>Miso Ramen</StyledLogoText>
    </StyledLogoWrap>;
};


export default Logo;