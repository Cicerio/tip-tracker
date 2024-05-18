import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes, { string } from 'prop-types';

const TipGrid = (props) => {
  return (
    <div style={{ 
        height: "fit-content", 
        width: '100%',
        margin: "2%" }}>
        <DataGrid rows={props.rows} columns={props.columns} toFixed={2} />
    </div>
  );
};
export default TipGrid;