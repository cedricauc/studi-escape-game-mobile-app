import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import api from "../../services/api";
import {
    Box,
    Container,
    Stack,
    Pagination,
    List,
    Link, Button,
} from '@mui/material'
import {styled} from "@mui/material/styles";
import {theme} from "../../utils/style/theme";
import usePagination from "./pagination";
import Clue from "./Clue";


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

const StyledPagination = styled(Pagination)(() => ({
    display: 'flex',
    justifyContent: 'center',
}))

function Room() {
    const navigate = useNavigate();

    const location = useLocation()

    const booking_id = location.pathname.split('/')[2]

    const scenario_id = location.pathname.split('/')[3]

    const [isClicked, setIsClicked] = useState(false);

    const [clues, setClues] = useState('');

    const [booking, setBooking] = useState('')

    let [page, setPage] = useState(1)
    const PER_PAGE = 1

    const data = usePagination(clues, PER_PAGE)

    const count = useRef(0)

    count.current = Math.ceil(clues.length / PER_PAGE)

    // changement de la page de navigation
    const handleChange = (e, p) => {
        setPage(p)
        data.jump(p)
    }

    useEffect(() => {
        // 👇️ set isMounted to true
        let isMounted = true;

        setIsClicked(false)

        async function fetchBookingData() {
            await api.get('/bookings/' +  booking_id + '/',
            ).then(
                result => {
                    setBooking(result.data)
                    console.log(result.data)
                }
            ).catch (error => {
                throw error;
            })
        }

        async function fetchClueData() {
            await api.get('/clues/',
            ).then(
                result => {
                    let rows = result.data.filter(
                        (obj) =>
                            obj.scenario_id === scenario_id
                    )

                    // changement des données de la liste
                    count.current = Math.ceil(rows.length / PER_PAGE)
                    setClues(rows)
                    data.setData(rows)
                }
            ).catch (error => {
                throw error;
            })
        }

        fetchBookingData();
        fetchClueData();

        return () => {
            // 👇️ when component unmounts, set isMounted to false
            isMounted = false;
        };

    }, [isClicked])

    const startGame = async () => {
        setIsClicked(true)

        const dt = new Date()

        const formData = {
            in_progress: true,
            start_hour: dt.getHours().toLocaleString(),
            start_minutes: dt.getMinutes().toLocaleString()
        };

        api.post('/bookings/' +  booking_id + '/', formData).then(response => {
        }).catch (error => {
                throw error;
        })
    }

    const endGame = async () => {
        setIsClicked(true)

        const dt = new Date()

        const formData = {
            in_progress: false,
            is_complete: true,
            end_hour: dt.getHours().toLocaleString(),
            end_minutes: dt.getMinutes().toLocaleString()
        };

        api.post('/bookings/' +  booking_id + '/', formData).then(response => {
            navigate('/', {replace: true});
        }).catch (error => {
            throw error;
        })
    }

    return(
        <Box component="main" position="static">
            <StyledContainer position="static">

                <StyledBox>
                    <Stack  direction="column"  justifyContent="space-between">
                        <Box sx={{my:5}}>
                            {!booking.in_progress && !booking.is_complete &&
                                <Button
                                    onClick={() => startGame()}
                                    component={Link}
                                    id="navbar-register-button"
                                    variant="contained"
                                    aria-haspopup="false"
                                    sx={{
                                        p:2,
                                        borderRadius: 29,
                                        backgroundColor: 'light.main',
                                        color: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                            color: 'light.main',
                                        },
                                        '&.active': {
                                            backgroundColor: 'primary.main',
                                            color: 'light.main',
                                        },
                                    }}
                                >
                                    Commencer la partie
                                </Button>
                            }
                            {booking.in_progress && page === count.current && !booking.is_complete &&
                                <Button
                                    onClick={() => endGame()}
                                    component={Link}
                                    id="navbar-register-button"
                                    variant="contained"
                                    aria-haspopup="false"
                                    sx={{
                                        p:2,
                                        borderRadius: 29,
                                        backgroundColor: 'light.main',
                                        color: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.main',
                                            color: 'light.main',
                                        },
                                        '&.active': {
                                            backgroundColor: 'primary.main',
                                            color: 'light.main',
                                        },
                                    }}
                                >
                                    Terminer la partie
                                </Button>
                            }
                        </Box>
                        <Box sx={{my:5}}>
                            {booking.in_progress &&
                                <List p="10" pt="3" spacing={2}>
                                    {Array.isArray(data.currentData())
                                        ? data.currentData().map((v) => {
                                            return (
                                                <Box key={v}>
                                                    <Clue room_num={v.room_num} clue={v.clue}></Clue>
                                                </Box>
                                            )
                                        })
                                        : null}
                                </List>
                            }
                        </Box>
                        <Box sx={{my:5}}>
                            {booking.in_progress &&
                                <StyledPagination
                                    count={count.current}
                                    size="large"
                                    page={page}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={handleChange}
                                />
                            }
                        </Box>
                    </Stack>
                </StyledBox>
            </StyledContainer>
        </Box>
    )
}

export default Room