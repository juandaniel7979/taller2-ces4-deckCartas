import { CardMedia, Grid } from '@mui/material'
import React from 'react'

const Carta = ({imagen}) => {
  return (
    <Grid item key={imagen} xs={3} >
                <CardMedia component="img"
                sx={{ width: 151 }}
                image={imagen}
                key={imagen} />
    </Grid>
  )
}

export default Carta