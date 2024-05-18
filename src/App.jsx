import * as React from 'react';
import { useState } from 'react'
import './App.css'
import PropTypes from 'prop-types'

import { Button, ButtonGroup } from '@mui/material'
import TipGrid from './Components/TipGrid'
import {TextField} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
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
  
  const [deliveryCount, setDeliveryCount] = useState(0)
  const [tipType, setTipType] = useState('credit')
  const tips = [
    { id: 1, cash: 0, credit: 1.25 },
    { id: 2, cash: 0, credit: 5 },
    { id: 3, cash: 0, credit: 20.15 },
    { id: 4, cash: 2, credit: 17.89 },
    { id: 5, cash: 5, credit: 25 }
  ];
  const [tipsArray, setTipsArray] = useState(tips)

  const columns = [
    { field: 'id', headerName: "Delivery", width: 80 },
    { field: 'cash', headerName: 'Cash', width: 150 },
    { field: 'credit', headerName: 'Credit', width: 150 },
  ];
  const handleChange = (event) => {
    setTipType(event.target.value);
  };
  /**
   * Adds a tip to the given array based on the tip type and amount.
   *
   * @param {string} tipType - The type of the tip ('cash' or 'credit').
   * @param {number} tipAmt - The amount of the tip.
   * @param {Array} array - The array to which the tip will be added.
   * @return {void} This function does not return a value.
   */
  const addTip = (tipType, tipAmt, array) =>{
    array.push({ 
      id: deliveryCount, 
      cash:   tipType === 'cash'   ? tipAmt : 0,
      credit: tipType === 'credit' ? 0 : tipAmt 
    });
    setDeliveryCount()
  }
  const removeTip = (newCount, array) => {
    const newTips = array.filter((_, index) => index !== tipsArray.length - 1);
    setTipsArray(newTips);
    setDeliveryCount(newCount - 1);
  }

  return (
    <ThemeProvider theme = {theme}>
      <main>
        <h2>Tip Tracker</h2>
        <ButtonGroup variant='contained' aria-label="Basic button group">
          <Button>Load file</Button>
          <Button>Save file</Button>
          <Button onClick={() => setTipsArray([])}>Clear file</Button>
        </ButtonGroup>
        <TipGrid rows={tipsArray} columns={columns} />
        <section id='input' >
          <TextField id="outlined-basic" label="Tip Amount" variant="outlined"/>
          <div id='selectBox'>
            {/* <InputLabel id="demo-simple-select-label">Tip Type</InputLabel> */}
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipType}
                label="Tip Type"
                onChange={handleChange}
              >
                  <MenuItem value={'cash'}>Cash</MenuItem>
                  <MenuItem value={'credit'}>Credit</MenuItem>
            </Select>
          </div>
        </section>
        <ButtonGroup aria-label="Basic button group">
          <Button >Apply</Button>
          <Button onClick={() => removeTip(deliveryCount, tipsArray)}>Undo Last</Button>
        </ButtonGroup>
      </main>
    </ThemeProvider>
  )
}

export default App
