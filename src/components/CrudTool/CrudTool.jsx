import React from 'react'
import './CrudTool.css'
import { Flex, DropdownMenu, Button } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { FiMoreVertical } from "react-icons/fi";

const CrudTool = ({ onDelete }) => {
    const handleDeleteClick = () => {
        onDelete && onDelete(); 
    };

    return (
        <Flex gap="3" align="center">
            <DropdownMenu.Root >
                <DropdownMenu.Trigger >
                    <Button variant="soft" color='gray'>
                        <FiMoreVertical />
                        
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content variant="solid">
                    <DropdownMenu.Item shortcut=" E">Editar</DropdownMenu.Item>
                    <DropdownMenu.Separator />

                    <DropdownMenu.Item shortcut=" ⌫" color="red" onClick={handleDeleteClick}>
                        Excluir
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Flex>
    )
}

export default CrudTool