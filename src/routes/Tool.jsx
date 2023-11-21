import React, { useState } from 'react'
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import "../styles/Tool.css";

import TableTool from '../components/tabletool/TableTool';
import Header from '../components/header/Header';

const Tool = () => {
  const [toolCode, setToolCode] = useState('');
  const [toolName, setToolName] = useState('');
  const [toolQuantity, setToolQuantity] = useState('');

  // Funções para atualizar os estados quando os inputs mudarem
  const handleToolCodeChange = (event) => {
    setToolCode(event.target.value);
  };

  const handleToolNameChange = (event) => {
    setToolName(event.target.value);
  };

  const handleToolQuantityChange = (event) => {
    setToolQuantity(event.target.value);
  };

  // Função para imprimir as informações no terminal
  const handleAddButtonClick = async () => {
    const toolData = {
      toolCode: toolCode,
      toolName: toolName,
      toolQuantity: toolQuantity 
    };
  
    try {
      const response = await fetch('http://localhost:3000/addtools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toolData)
      });
  
      if (!response.ok) {
        throw new Error('Erro ao adicionar a ferramenta');
      }
  
      const data = await response.json();
      console.log('Resposta do servidor:', data);
      setToolCode('');
      setToolName('');
      setToolQuantity('');
    } catch (error) {
      console.error('Erro ao adicionar a ferramenta:', error);
    }
  };

  return (
    <>
      <Header />
    <Flex direction="column" gap="6" right="3" align="center">
      <Form.Root className="FormRoot">
      <Text as="div" size="6" mb="1" weight="bold"  color='green'>
          Cadastro de Ferramentas:
        </Text>
        <br></br>
        <Form.Field className="FormField" name="email">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Código</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Campo obrigatório
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" required  value={toolCode} onChange={handleToolCodeChange}/>
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="email">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Nome da Ferramenta</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Campo obrigatório
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" value={toolName} onChange={handleToolNameChange} required />
          </Form.Control>
        </Form.Field>

        <Form.Field className="FormField" name="email">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Quantidade disponível</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Campo obrigatório
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="number" value={toolQuantity} onChange={handleToolQuantityChange} required />
          </Form.Control>
        </Form.Field>



        <Form.Submit asChild>
          <Button className="Button" color='green' style={{ marginTop: 10 }} onClick={handleAddButtonClick}>
            Enviar
          </Button>
        </Form.Submit>
      </Form.Root>
      <TableTool/>
       <div className='margin__'></div>
    </Flex>
    </>
  )
}

export default Tool