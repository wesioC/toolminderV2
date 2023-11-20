import React from 'react';
import { Grid, Box, Text } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './Footer.css';

const Footer = () => {
  return (
    <Grid className='footer_' columns="3" gap="3" width="100%">
      <Box height="9" >
      <a href="/" className="nav__brand" ><img src="\src\img\toolminder.svg"></img></a>
      <div><Text className='text__gw' align='center'>Aplicativo desenvolvido por Gustavo Moura e Wésio Coelho para auxiliar na adminstração das ferramentas do Laboratório de Ciências Agrárias do Instituto Federal Goiano - campus Rio Verde</Text>
      </div>
      </Box>
      <Box height="9" >
      <Text className='text__footer'>Mapa do site:</Text>
      </Box>
      <Box height="9" >
        <Text className='text__footer'>Suporte:</Text>
      </Box>
    </Grid>
  );
};

export default Footer;
