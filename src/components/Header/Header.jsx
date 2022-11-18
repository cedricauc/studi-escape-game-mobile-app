import React from 'react'
import {
    AppBar,
    Box,
    Button, Container,
    Divider,
    Drawer,
    IconButton,
    Link,
    Toolbar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import TokenService from "../../services/token.service";
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service";

function Header() {
    const auth = AuthService.getCurrentUser()

    const navigate = useNavigate()
    //react useState hook pour l'état ouverture/fermeture
    const [open, setState] = React.useState(null)

    const openDrawer = Boolean(open)

    //fonction appelée quand le tiroir s'ouvre ou se ferme
    const toggleDrawer = (open) => (event) => {
        //change l'état de la fonction suivant la valeur de open
        setState(open)
    }

    const handleClick = () => {
        TokenService.removeUser();
        navigate('/login')
    }

    const handleHomeClick = () => {
        navigate('/')
    }

    return (
        <AppBar
            position="static"
            sx={{margin: 0, backgroundColor: 'primary.main'}}
        >
            <Container maxWidth="lg" disableGutters>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="ouvrir tiroir"
                    onClick={toggleDrawer(true)}
                    sx={{
                        marginLeft: 'auto',
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Drawer
                    //emplacement tiroir
                    anchor="right"
                    //si ouvert--> afficher tirroir
                    open={openDrawer}
                    //fonction quand le tiroir se ferme
                    onClose={toggleDrawer(false)}
                >
                    <Box
                        sx={{
                            p: 2,
                            height: 1,
                            backgroundColor: 'light.main',
                        }}
                    >
                        {/* en cliquant sur l'icône--> appelle de la fonction toggleDrawer et fermeture du tiroir */}
                        <IconButton sx={{mb: 2}} onClick={toggleDrawer(false)}>
                            <CloseIcon sx={{color: 'dark.main'}}/>
                        </IconButton>
                        <Divider sx={{mb: 2, borderColor: 'dark.main'}}/>
                        <Box sx={{mb: 2}}>
                            <Button
                                component={Link}
                                onClick={() => handleClick()}
                                id="logout-button"
                                variant="contained"
                                sx={{
                                    m: 0,
                                    p: 1,
                                    width: 1,
                                    backgroundColor: 'primary.main',
                                    color: 'light.main',
                                    '&:hover': {
                                        backgroundColor: 'secondary.main',
                                        color: 'light.main',
                                    },
                                    '&.active': {
                                        backgroundColor: 'secondary.main',
                                        color: 'light.main',
                                    },
                                }}
                            >
                                Se déconnecter
                            </Button>
                        </Box>
                        { auth ?
                        <Box>
                            <Button
                                component={Link}
                                onClick={() => handleHomeClick()}
                                id="home-button"
                                variant="contained"
                                sx={{
                                    m: 0,
                                    p: 1,
                                    width: 1,
                                    backgroundColor: 'primary.main',
                                    color: 'light.main',
                                    '&:hover': {
                                        backgroundColor: 'secondary.main',
                                        color: 'light.main',
                                    },
                                    '&.active': {
                                        backgroundColor: 'secondary.main',
                                        color: 'light.main',
                                    },
                                }}
                            >
                                Séances
                            </Button>
                        </Box>
                        : null }
                    </Box>
                </Drawer>
            </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header