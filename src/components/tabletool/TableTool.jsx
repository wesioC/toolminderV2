import React from 'react'
import { Table, Button } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './TableTool.css';
import Loan from '../loan/Loan';
import CrudTool from '../CrudTool/CrudTool';



const TableTool = () => {
    return (

        <div className='table__tool'>
            <Table.Root className='custom-table-tool'>
                <Table.Header>
                    <Table.Row className='title__row__tool'>
                        <Table.ColumnHeaderCell align='center'>Código</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align='center'>Ferramenta</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align='center'>Quantidade</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align='center'>Proprietário</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell align='center'>Ação</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.RowHeaderCell align='center'>IFGRV56</Table.RowHeaderCell>
                        <Table.RowHeaderCell align='center'>Mangueira</Table.RowHeaderCell>
                        <Table.Cell align='center'>1</Table.Cell>
                        <Table.Cell align='center'>IF Goiano</Table.Cell>
                        <Table.Cell align='center'>
                            <div className="button-container">
                                <Loan/>
                                {/* <Button  variant="solid" color='green'>Devolver</Button> */}
                                <CrudTool/>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default TableTool