import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes, { string } from 'prop-types';
import { GridFooter } from '@mui/x-data-grid';

const TipGrid = (props) => {
    const totalCash = props.rows.reduce((total, tip) => total + tip.cash, 0).toFixed(2);
    const totalCredit = props.rows.reduce((total, tip) => total + tip.credit, 0).toFixed(2);
    const totalTips = parseFloat(totalCash) + parseFloat(totalCredit);
    
  return (
    <div style={{ 
        width: '100%',
        margin: "2%" }}>
        <DataGrid 
            rows={props.rows} 
            columns={props.columns} 
            initialState={{
                pagination: {
                paginationModel: {
                    pageSize: 7,
                },
                },
            }}
            pageSizeOptions={[7]}/>
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '0' }}>
            <p>Total Cash: {'$' + totalCash}</p>
            <p>Total Credit: {'\$' + totalCredit}</p>
            <p>Total Tips: {'\$' + totalTips}</p>
        </div>
    </div>
  );
};
TipGrid.propTypes = {
    rows: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      cash: PropTypes.number.isRequired,
      credit: PropTypes.number.isRequired,
    })).isRequired,
    columns: PropTypes.array.isRequired,
  };
export default TipGrid;