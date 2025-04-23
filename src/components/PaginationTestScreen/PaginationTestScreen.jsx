import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from '@mui/material';

export default function PaginationTestScreen(props) {
  
  return (
    <Pagination count={props.count} defaultPage={props.defaultPage} 
    onChange={props.handleChange} variant="outlined" shape="rounded" 
    renderItem={(item) => (
        props.completed.indexOf(parseInt(item.page)) != -1 ? 
        <PaginationItem
          style={{backgroundColor: "grey"}}
          {...item}
        />
        :
        <PaginationItem
          style={{backgroundColor: "white"}}
          {...item}
        />
      )}
    />
  );
}