import React, {useEffect, useState} from 'react'
import {styled} from "@mui/material/styles";
import {Box, Card, CardContent, Container} from "@mui/material";
import GameItem from "./GameItem";
import api from "../../services/api";
import { Typography } from '@mui/material';

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
    justifyContent: 'center'
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
                    {Array.isArray(games) && games.length > 0
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
                        :
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14, mt:2 }} color="text.secondary" gutterBottom>
                                        Aucune réservations
                                    </Typography>
                                </CardContent>
                            </Card>

                    }
                </StyledBox>
            </StyledContainer>
        </Box>
    )
}

export default Home