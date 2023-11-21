import React from 'react'
import Historic from '../components/historic/Historic'
import Header from '../components/header/Header'
import { Flex } from '@radix-ui/themes';

const Historico = () => {
  return (
    <>
    <Header/>
    <Flex direction="column" gap="6" right="3" align="center">
        <div></div>
    <Historic/>
    </Flex>
    </>
  )
}

export default Historico