import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Box, Button, Container, FormControl, FormHelperText, Grid, Input, InputLabel, Paper} from "@mui/material";
import {styled} from '@mui/material/styles'
import {theme} from "../../utils/style/theme";
import AuthService from "../../services/auth.service";

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

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        AuthService.login(username, password).then(
            result => {
                navigate('/', {replace: true});
            }
        ).catch (error => {
            throw error;
        })
    }

    return (
        <Box component="main" position="static">
            <StyledContainer position="static">
                <StyledBox component="form" onSubmit={handleSubmit}>
                    <Paper>
                        <Grid
                            container
                            direction={'column'}
                            justify={'center'}
                            alignItems={'center'}>
                            <Grid item xs={12}>
                                <FormControl>
                                    <InputLabel htmlFor="username-input">Username</InputLabel>
                                    <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username-input" name="username" aria-describedby="username-helper-text"/>
                                    <FormHelperText id="username-helper-text"></FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <InputLabel htmlFor="password-input">Password</InputLabel>
                                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  id="password-input" name="password" aria-describedby="password-helper-text"/>
                                    <FormHelperText id="password-helper-text"></FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth>Login</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </StyledBox>
            </StyledContainer>
        </Box>
    )
}

export default Login