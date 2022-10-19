import React, {useEffect, useState} from 'react'
import {styled} from "@mui/material/styles";
import {Box, Container} from "@mui/material";
import {theme} from "../../utils/style/theme";
import GameItem from "./GameItem";
import api from "../../services/api";

const StyledContainer = styled(Container)(() => ({
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: theme.palette.primary.main
}))

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
}))

function Home() {
    const [games, setGames] = useState('');

    useEffect(() => {
        // 👇️ set isMounted to true
        let isMounted = true;

        async function fetchData() {
            await api.get('/games/',
            ).then(
                result => {
                    setGames(result.data)
                }
            ).catch (error => {
                throw error;
            })
        }

        fetchData();

        return () => {
            // 👇️ when component unmounts, set isMounted to false
            isMounted = false;
        };

        }, [])

    return(
        <StyledBox component="main" position="static">
            <StyledContainer position="static">
                {Array.isArray(games)
                    ? games.map(element => {
                        return (
                            <Box key={element.id} sx={{ flex: 1, my: 1 }}>
                                <GameItem
                                    id={element.id}
                                    start_time={element.start_time}
                                    scenario={element.scenario}
                                />
                            </Box>
                            )
                    })
                    : null}
            </StyledContainer>
        </StyledBox>
    )
}

export default Home