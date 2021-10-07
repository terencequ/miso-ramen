import React, {FC} from 'react';
import {Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import {PageContainer} from '../styles/GlobalStyles';
import {useAppDispatch} from "../../../redux/hooks";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";


const HomePage: FC = () => {
    const dispatch = useAppDispatch();

    document.title = "Miso Ramen"
    dispatch(setBackground("inherit"));
    return <PageContainer>
        <Typography gutterBottom align={"center"} variant={"h1"}>Home Page</Typography>
    </PageContainer>;
};

export default HomePage;
