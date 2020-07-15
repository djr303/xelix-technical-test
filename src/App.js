import React, { useEffect, useReducer } from 'react'
import Header from './components/Header';
import Invoices from './components/Invoices'
import { SET_INVOICES, SET_ERROR_STATE } from './constants'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';

const invoiceReducer = (state, action) => {
  switch (action.type) {
    case SET_INVOICES:
      return action.payload.invoices
    case SET_ERROR_STATE:
      const index = state.findIndex(invoice => invoice.id === action.payload.id)
      state.splice(index, 1)
      return [ ...state ]
    default:
      throw new Error();
  }
}

const patchInvoice = async (id, errorState) => {
  const res = await fetch(`http://3.10.51.122/invoice/${id}`, {
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ error_state: errorState }) // body data type must match "Content-Type" header
  });
} 

const App = () => {

  const [ invoices, dispatch ] = useReducer(invoiceReducer, []);

  const fetchData = async () => {
    const res = await fetch("http://3.10.51.122/invoice");
    res
      .json()
      .then(json => dispatch({type: SET_INVOICES, payload: { invoices : json}})) 
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="xelix-technical-test">
      { invoices.length > 0 ? (
        <>
          {/* <Header invoices={invoices} /> */}
          <Invoices setErrorState={(id, errorState) => { dispatch({ type: SET_ERROR_STATE, payload: { id, errorState}})}} invoices={invoices} />
        </>
      ) : null }
    </div>
  );
}

export default App;
