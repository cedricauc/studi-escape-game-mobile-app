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
    height: '100%',
}))

const StyledBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    height: '100%',
    flexDirection: 'column',
}))

function Home() {
    const [games, setGames] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            await api.get('/bookings/',
            ).then(
                result => {
                    setGames(result.data)
                }
            ).catch (error => {
                throw error.data;
            })
        }

        fetchData();

        return () => {
            isMounted = false;
        };

        }, [])

    return(
        <Box component="main" position="static">
            <StyledContainer position="static">
                <StyledBox position="static">
                    {Array.isArray(games)
                        ? games.map(element => {
                            return (
                                <Box key={element.id} sx={{ flex: 1, my: 1 }}>
                                    <GameItem
                                        id={element.id}
                                        in_progress={element.in_progress}
                                        is_complete={element.is_complete}
                                        game_start_time={element.game_start_time}
                                        scenario_id={element.scenario_id}
                                        scenario_title={element.scenario_title}
                                    />
                                </Box>
                            )
                        })
                        : null}
                </StyledBox>
            </StyledContainer>
        </Box>
    )
}

export default Home