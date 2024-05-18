import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes, { string } from 'prop-types';

const TipGrid = (props) => {
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
          pageSizeOptions={[7]} />
    </div>
  );
};
export default TipGrid;