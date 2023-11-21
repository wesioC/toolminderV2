import React from 'react'
import { Table, Button } from '@radix-ui/themes';
import './Historic.css'

const Historic = () => {
  return (
    <div className='table__historic'>
            <Table.Root className='custom__table__historic'>
                <Table.Header>
                    <Table.Row className='title__row'>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Nome</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Ferramenta</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Quantidade</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='title__row' align='center'>Data da devolução</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                        <Table.Row>
                            <Table.RowHeaderCell align='center'></Table.RowHeaderCell>
                            <Table.RowHeaderCell align='center'></Table.RowHeaderCell>
                            <Table.Cell align='center'></Table.Cell>
                            <Table.Cell align='center'></Table.Cell>
                        </Table.Row>
                </Table.Body>
            </Table.Root>
        </div>
  )
}

export default Historic