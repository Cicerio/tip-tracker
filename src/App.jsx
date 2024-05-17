import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Button, ButtonGroup } from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];


function App() {

  return (
    <>
      <main>
        <h2>Tip Tracker</h2>
        <ButtonGroup variant='contained' aria-label="Basic button group">
          <Button>Load file</Button>
          <Button>Save file</Button>
          <Button>Clear file</Button>
        </ButtonGroup>
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </main>
    </>
  )
}

export default App
