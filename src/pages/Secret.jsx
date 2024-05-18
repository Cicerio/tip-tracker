import * as React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import '../HomePage.css'

import { Button, ButtonGroup } from '@mui/material'
import TipGrid from '../Components/TipGrid'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import { useAuth } from "../hooks/useAuth";
/**
 * The Plan:
 * 
 * Things to add:
 * Manditory login screen (REACT ROUTER)
 * File saving (Maybe if I have time)
 */

function HomePage() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  //Converts light to dark mode depending on system preference
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
//states
  const [deliveryCount, setDeliveryCount] = useState(5);
  const [tipCash, setTipCash] = useState(0);
  const [tipCredit, setTipCredit] = useState(0);
  const [cashBuffer, setCashBuffer] = useState('');
  const [creditBuffer, setCreditBuffer] = useState('');
  const [tipsArray, setTipsArray] = useState([
    { id: 1, cash: 0, credit: 1.25 },
    { id: 2, cash: 0, credit: 5 },
    { id: 3, cash: 0, credit: 20.15 },
    { id: 4, cash: 2, credit: 17.89 },
    { id: 5, cash: 5, credit: 25 }
  ]);
  const columns = [
    { field: 'id', headerName: "Drive", width: 100 },
    { field: 'cash', headerName: 'Cash', width: 170 },
    { field: 'credit', headerName: 'Credit', width: 170 },
  ];
// Event handlers for the Buttons.

const handleCashChange = (e) => {
  setCashBuffer(e.target.value);
};

const handleCreditChange = (e) => {
  setCreditBuffer(e.target.value);
};
/**
 * Side effect where the tip float states are updated when the buffers are.
 *    Buffers are the string values of the Inputs, 
 *    and what display in the OutlineInputs.
 */
useEffect(() => {
  setTipCash(cashBuffer ? parseFloat(cashBuffer) : 0);
  setTipCredit(creditBuffer ? parseFloat(creditBuffer) : 0);
}, [cashBuffer, creditBuffer]);
const handleApplyClick = () => {
  addTip(tipCash, tipCredit)
  setCashBuffer('');
  setCreditBuffer('');
};
  const handleClearFile = () => {
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
  const addTip = (cashTip, creditTip) => {

    const newTip = {
      id: deliveryCount + 1,
      cash: cashTip ? cashTip : 0,
      credit: creditTip ? creditTip : 0,
    };
    setTipsArray(tipsArray => [...tipsArray, newTip])
    setDeliveryCount(deliveryCount + 1);
  }
  /**
   * Removes the last tip from the given array and updates the delivery count.
   *
   * @param {number} newCount - The new delivery count.
   * @param {Array} array - The array of tips.
   * @return {void} This function does not return a value.
   */
  const removeTip = (newCount, array) => {
    if (tipsArray.length === 0) {
      return
    } else {
      const newTips = array.filter((_, index) => index !== tipsArray.length - 1);
      setTipsArray(newTips);
      setDeliveryCount(newCount - 1);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <main style={{maxHeight: "100%"}}>
        <h2>Tip Tracker</h2> 
        <ButtonGroup variant='contained' aria-label="Basic button group">
          <Button>Load file</Button>
          <Button>Save file</Button>
          <Button onClick={() => handleClearFile()}>Clear file</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Basic button group">
          <Button onClick={handleLogout}>LOG OUT</Button>
         </ButtonGroup>

        {/* Tip grid */}
        <TipGrid rows={tipsArray} columns={columns} deliveries={deliveryCount}/>
        <section id='input' style={{ marginTop:'120px'}} >
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-input-cash">Cash</InputLabel>
            <OutlinedInput
              id="outlined-input-cash"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Cash"
              type="number"
              value={cashBuffer}
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
              value={creditBuffer}
              onChange={handleCreditChange}
            />
          </FormControl>
        </section>
        <ButtonGroup aria-label="Basic button group">
          <Button onClick={handleApplyClick}>Apply</Button>
          <Button onClick={() => removeTip(deliveryCount, tipsArray)}>Undo Last</Button>
          <Divider orientation="vertical" flexItem />
        </ButtonGroup>
      </main>
    </ThemeProvider>
  )
}

export default HomePage
