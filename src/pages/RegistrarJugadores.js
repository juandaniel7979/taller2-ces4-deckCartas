import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import usePartida from '../hooks/usePartida';

const RegistrarJugadores = () => {
    const navigator = useNavigate();
    const {nuevaPartida, handleChangePlayer1,handleChangePlayer2,player1,player2} = usePartida();
    const theme = createTheme();

    // const handleNombre =(e)=>{
    //     handleChangePlayer1(e.target.value);
    //     handleChangePlayer2(e.target.value);
    // }


     const Iniciar = async ()=>{
        await nuevaPartida();
        navigator("/partida");
    }

    // useEffect(() => {
    //     handleChangePlayer1();
    //     handleChangePlayer2();
    // }, [player1,player2])

  return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            {/* <Typography component="h1" variant="h5">
                Sign in
            </Typography> */}
            <Box component="form"  noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="player1"
                label="Player 1"
                name="player1"
                autoFocus
                value={player1.nombre}
                onChange={(e) => handleChangePlayer1(e)}

                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="player2"
                label="Player 2"
                id="player2"
                value={player2.nombre}
                onChange={(e) => handleChangePlayer2(e)}
                />
                <Button
                fullWidth
                variant="contained"
                onClick={Iniciar}
                sx={{ mt: 3, mb: 2 }}
                >
                Registrar jugadores
                </Button>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
)
}

export default RegistrarJugadores