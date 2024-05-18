import * as React from 'react';
import { useState } from 'react'
import './App.css'
import PropTypes from 'prop-types'

import { Button, ButtonGroup } from '@mui/material'
import TipGrid from './Components/TipGrid'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

  /**
   * The Plan:
   * 
   * Tip tracker. 
   *    Log in.
   *    Display main page
   *      Button for new save file, or load previous.
   *      
   * Maybe make the array a custom Component?
   */

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  
  const [deliveryCount, setDeliveryCount] = useState(5);
  const [tipCash, setTipCash] = useState(0);
  const [tipCredit, setTipCredit] = useState(0);
  const [tipsArray, setTipsArray] = useState([
    { id: 1, cash: 0, credit: 1.25 },
    { id: 2, cash: 0, credit: 5 },
    { id: 3, cash: 0, credit: 20.15 },
    { id: 4, cash: 2, credit: 17.89 },
    { id: 5, cash: 5, credit: 25 }
  ]);
  const columns = [
    { field: 'id', headerName: "Delivery", width: 80 },
    { field: 'cash', headerName: 'Cash', width: 130 },
    { field: 'credit', headerName: 'Credit', width: 130  },
  ];

  const handleCashChange = (e) => {
    setTipCash(e.target.value);
  };
  const handleCreditChange = (e) => {
    setTipCredit(e.target.value);
  };
const handleClearFile = () =>{
  setTipsArray([])
  setDeliveryCount(0)
}

  /**
   * Adds a tip to the given array based on the tip type and amount.
   *
   * @param {number} cashTip - The amount tipped in cash.
   * @param {number} creditTip - The amount tipped in credit.
   * @return {void} This function does not return a value.
   */
  const addTip = (cashTip, creditTip) =>{

    const newTip ={ 
      id: deliveryCount + 1 , 
      cash:   cashTip ? cashTip : 0,
      credit: creditTip ? creditTip : 0 ,
    };
    setTipsArray(tipsArray => [...tipsArray, newTip])
    setDeliveryCount(deliveryCount + 1);
  }
  const removeTip = (newCount, array) => {
    if (tipsArray.length === 0){
      return
    }else{
      const newTips = array.filter((_, index) => index !== tipsArray.length - 1);
      setTipsArray(newTips);
      setDeliveryCount(newCount - 1);
    }
  }

  return (
    <ThemeProvider theme = {theme}>
      <main>
        <h2>Tip Tracker</h2>
        <ButtonGroup variant='contained' aria-label="Basic button group">
          <Button>Load file</Button>
          <Button>Save file</Button>
          <Button onClick={() => handleClearFile()}>Clear file</Button>
        </ButtonGroup>
        <TipGrid rows={tipsArray} columns={columns} />
        <section id='input' >
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-input-cash">Cash</InputLabel>
          <OutlinedInput
            id="outlined-input-cash"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Cash"
            type="number"
            value={tipCash}
            onChange={handleCashChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-input-credit">Credit</InputLabel>
          <OutlinedInput
            id="outlined-input-credit"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Credit"
            type="number"
            value={tipCredit}
            onChange={handleCreditChange}
          />
        </FormControl>
        </section>
        <ButtonGroup aria-label="Basic button group">
          <Button onClick={() => addTip(tipCash, tipCredit)}>Apply</Button>
          <Button onClick={() => removeTip(deliveryCount, tipsArray)}>Undo Last</Button>
        </ButtonGroup>
      </main>
    </ThemeProvider>
  )
}

export default App
