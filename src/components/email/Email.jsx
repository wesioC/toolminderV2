import React from 'react';
import './CrudTool.css';
import { Flex, DropdownMenu, Button } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { FaBell } from 'react-icons/fa';
import EditTool from './EditTool';

const sendEmail = async (toolName, toolQuantity, receiver, receiverEmail, dateHand) => {
  try {
    const response = await fetch('http://seuservidor.com/enviarEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: receiverEmail, // O e-mail do destinatário
        subject: 'Assunto do e-mail aqui', // Assunto do e-mail
        text: 'Texto do e-mail aqui', // Conteúdo do e-mail
      }),
    });

    if (response.ok) {
      alert('E-mail enviado com sucesso!');
    } else {
      alert('Erro ao enviar o e-mail.');
    }
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    alert('Erro ao enviar o e-mail. Verifique o console para mais informações.');
  }
};

const Email = ({ toolName, toolQuantity, receiver, receiverEmail, dateHand }) => {
  return (
    <Flex gap="3" align="center">
      <Button
        variant="solid"
        color="blue"
        onClick={() => sendEmail(toolName, toolQuantity, receiver, receiverEmail, dateHand)}
      >
        <FaBell />
      </Button>
    </Flex>
  );
};

export default Email;
