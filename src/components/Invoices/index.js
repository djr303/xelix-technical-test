import React from 'react';
import { Table, Button } from 'react-bootstrap';
import './index.scss'

const Invoices = ({ setErrorState, invoices }) => {

  return (
    <>
      <Table className="invoice-table" striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Data error</th>
            <th>Due date</th>
            <th>Is open</th>
            <th>Reference</th>
            <th>Supplier</th>
            <th>Mark as 'error'</th>
            <th>Mark as 'suspect'</th>
            <th>Mark as 'correct'</th>
          </tr>
        </thead>
        <tbody>
          { invoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.data_error}</td>
              <td>{invoice.due_date}</td>
              <td>{invoice.is_open ? 'Open' : 'Closed'}</td>
              <td>{invoice.reference}</td>
              <td>{invoice.supplier}</td>
              <td>
                <Button onClick={() => setErrorState(invoice.id, 2)} variant="danger">Error</Button>
              </td>
              <td>
                <Button onClick={() => setErrorState(invoice.id, 2)} variant="warning">Supect</Button>
              </td>
              <td>
                <Button variant="success">Correct</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )

}

export default Invoices