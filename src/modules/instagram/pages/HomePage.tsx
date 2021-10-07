import React, {FC, useEffect, useState} from 'react';
import {Button, Typography} from "@material-ui/core";
import {PageContainer} from '../../core/styles/GlobalStyles';
import {useAppDispatch} from "../../../redux/hooks";


const HomePage: FC = () => {
    const dispatch = useAppDispatch();

    document.title = "Miso Ramen"


    return <PageContainer>
        <Typography variant={"h2"} textAlign={"center"}>Home Page</Typography>
    </PageContainer>;
};

export default HomePage;
