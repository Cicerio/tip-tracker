import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes, { string } from 'prop-types';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

const TipGrid = (props) => {
  const totalCash = props.rows.reduce((total, tip) => total + tip.cash, 0).toFixed(2);
  const totalCredit = props.rows.reduce((total, tip) => total + tip.credit, 0).toFixed(2);
  const totalTips = (parseFloat(totalCash) + parseFloat(totalCredit)).toFixed(2);

  return (
    <div style={{
      height: 475,
      width: '100%',
      margin: "2%"
    }}>
      {/* default settings for DataGrid */}
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
        pageSizeOptions={[7]} 
        disableColumnResize={true}
        density={"standard"}
        autoPageSize={true}
        />
        {/* Footer of grid, displays total values added up */}
        <div id={'totalsBox'}style={{ display: 'flex', justifyContent: 'space-around', fontSize: 'small' }}>
          <Card variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between', fontSize:"large", minWidth:"100%"}}>
            <p style={{margin:"10px 10px"}}>Drives:  {props.deliveries}</p>
            <Divider orientation="vertical" flexItem />
            <p style={{margin:"10px 10px"}}>Total Cash: {'$' + totalCash}</p>
            <Divider orientation="vertical" flexItem />
            <p style={{margin:"10px 10px"}}>Total Credit: {'\$' + totalCredit}</p>
            <Divider orientation="vertical" flexItem />
            <p style={{margin:"10px 10px"}}>Total Tips: {'\$' + totalTips}</p>
          </Card>
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