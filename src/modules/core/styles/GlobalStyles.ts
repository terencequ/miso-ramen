import styled from "@emotion/styled";
import {Theme} from "@material-ui/core";

// helper function factory to get theme spacing
export const themeSpacing = (amount: number) => (props: any) => {
    const theme = props.theme as Theme;
    return theme.spacing(amount);
}

export const PageContainer = styled.div`
  margin: auto;
  width: 1200px;
  max-width: 95%;
`