import React, { useState } from 'react'
import {Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import "./Loan.css"

const Loan = ({ toolName, toolCode }) => {
  const [receiverName, setReceiverName] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loanQuantity, setLoanQuantity] = useState('');

  const handleLoanSubmission = () => {
    // Preparando os dados para enviar na solicitação POST
    const loanData = {
      toolCode: toolCode,
      toolName: toolName,
      toolQuantity: loanQuantity,
      dateHand: returnDate,
      receiver: receiverName,
      sender: 'UserName', // Definindo o remetente como 'UserName'
      receiverEmail: receiverEmail
    };

    console.log(loanData);

    // Enviar a solicitação POST para a rota http://localhost:3000/addloan
    fetch('http://localhost:3000/addloan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loanData),
    })
      .then(response => {
        if (response.ok) {
          // Lógica adicional caso a solicitação seja bem-sucedida
          console.log('Empréstimo realizado com sucesso!');
          window.location.reload();
        } else {
          throw new Error('Erro ao realizar empréstimo');
        }
      })
      .catch(error => {
        console.error('Erro ao realizar empréstimo:', error);
        // Lógica adicional para lidar com falhas na solicitação
      });
    
  };

  return (
    <Dialog.Root>
  <Dialog.Trigger>
    <Button variant="solid" color='orange'>Emprestar</Button>
  </Dialog.Trigger>

  <Dialog.Content style={{ maxWidth: 450 }}>
    <Dialog.Title>{toolName}</Dialog.Title>
    <Dialog.Description size="2" mb="4">
      Preencha os campos para emprestar a ferramenta.
    </Dialog.Description>

    <Flex direction="column" gap="3">
      <label >
        <Text as="div" size="2" mb="1" weight="bold">
          Nome do destinatário
        </Text>
        
        <TextField.Input 
          placeholder="Digite o nome completo"
          className='input_modal' value={receiverName} onChange={event => setReceiverName(event.target.value)}
        />
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Email do destinatário
        </Text>
        <TextField.Input
          type="email" 
          placeholder="Digite o email"
          className='input_modal'
          value={receiverEmail} onChange={event => setReceiverEmail(event.target.value)}
        />
      </label>
      <Flex gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Data de devolução
              </Text>
              <TextField.Input
                type="date"
                placeholder="Digite a data de devolução"
                className="input_modal"
                value={returnDate} onChange={event => setReturnDate(event.target.value)}
              />
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Quantidade
              </Text>
              <TextField.Input
                type="number"
                placeholder="Digite a quantidade"
                style={{ width: '24.65rem' }}
                className="input_modal"
                value={loanQuantity} onChange={event => setLoanQuantity(event.target.value)}
              />
            </label>
          </Flex>
    </Flex>

    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button color="red">
          Cancelar
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button onClick={handleLoanSubmission}>Emprestar</Button>
      </Dialog.Close>
    </Flex>
  </Dialog.Content>
</Dialog.Root>
  )
}

export default Loan