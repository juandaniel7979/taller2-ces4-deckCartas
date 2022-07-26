import * as React from 'react';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { Fab, Typography } from '@mui/material';
import usePartida from '../hooks/usePartida';
import { useNavigate } from 'react-router-dom';
import Carta from '../components/Carta';

const PartidaIniciada = () => {
    const navigator = useNavigate();
    const {player1,player2,pedirCartas,repetidos}=usePartida();

    React.useEffect(() => {
        if(player1.nombre==="" || player2.nombre===""){
            navigator('/');
        }
    })
    
    const pedido=()=>{
        pedirCartas();
    }

  return (
    <Box backgroundColor="#12420b" sx={{ width: '100%' }}>
        <Grid backgroundColor="#12420b" item container rowSpacing={3} >
            {/* player1 name */}
            <Grid  item  
            sx={{width: '47%'}} >
                <Typography component="h1"  color="white" fontWeight="bold" textAlign="center" variant="h4">
                    {`Jugador1: ${player1.nombre}`}
                </Typography>
            </Grid>
            {/* boton pedir mas */}
            <Grid  sx={{width:'3%',height:'100%'}}>
                <Fab color="primary" onClick={pedido} aria-label="add"
                sx={{top:50}}>
                    <AddIcon />
                </Fab>
            </Grid>
            {/* Player2 name */}
            <Grid item xs={6}
             sx={{width: '49%'}} >
                <Typography component="h1" textAlign="center" color="white" fontWeight="bold" variant="h4">
                    {`Jugador2: ${player2.nombre}`}
                </Typography>
            </Grid>
            <Grid item  xs={6}>
                <Typography component="h1" color="white" fontWeight="bold" textAlign="center" variant="h5">
                        Cartas Opcionadas
                </Typography>
            </Grid>
            <Grid item   xs={6}>
                <Typography component="h1" color="white" fontWeight="bold" textAlign="center" variant="h5">
                        Cartas Opcionadas
                </Typography>
            </Grid>
            {/* Player1 */}
            <Box backgroundColor="#12420b"  sx={{ width: '50%' }}>
                <br />
                <br />
            <Grid item container rowSpacing={{xs:3}}   justifyContent="center"  >
            {repetidos.length>0 ? repetidos.map((rep) => (
                <Carta imagen={rep.image}/>
                ))
                :
                <>
                <Grid item  backgroundColor="white" borderRadius={1}  
                sx={{
                    height: 140,
                    width: 100,
                    border:2,
                    borderColor:'white',
                    borderRadius:1
                    }}>
                </Grid>
                <Grid item  backgroundColor="white"   marginLeft={4}  
                sx={{
                    height: 140,
                    width: 100,
                    border:2,
                    borderColor:'white',
                    borderRadius:1
                    }}>
                </Grid>
                </>
            }
            </Grid>
            </Box>
            {/* Player2 */}
            <Box backgroundColor="#12420b"  sx={{ width: '50%' }}>
                <br />
                <br />
            <Grid item container rowSpacing={{xs:3}}   justifyContent="center"  >
                <Grid item  backgroundColor="white" borderRadius={1}  
                sx={{
                    height: 140,
                    width: 100,
                    border:2,
                    borderColor:'white',
                    borderRadius:1
                    }}>
                </Grid>
                <Grid item  backgroundColor="white"   marginLeft={4}  
                sx={{
                    height: 140,
                    width: 100,
                    border:2,
                    borderColor:'white',
                    borderRadius:1
                    }}>
                </Grid>
            </Grid>
            </Box>

            {/* Cartas jugador 1 */}
            <Box backgroundColor="#12420b"  sx={{ width: '50%' }}>
                <br />
                <br />
            <Grid item container rowSpacing={{xs:3}}   justifyContent="center"  >
            {/* {player1.cartas.slice(1).map((cartas) => ( */}
            {player1.cartas.map((cartas) => (
                <Carta imagen={cartas.image}/>
                ))
            }
            </Grid>
            </Box>
            <Box backgroundColor="#12420b"  sx={{ width: '50%' }}>
                <br />
                <br />
            <Grid  container rowSpacing={{xs:3}}   >
            {/* {player2.cartas.slice(1).map((cartas) => ( */}
            {player2.cartas.map((cartas) => (
                <Carta imagen={cartas.image}/>
                ))
            }
            </Grid>
            </Box>
            
        </Grid>
    </Box>
  )
}

export default PartidaIniciada