import { TableCell, TablePagination, TableRow } from '@mui/material';
import React from 'react';

import {
  RegisterInfo,
  RegisterResult
} from 'features/vaccination/injectionRegistrationSlice';
import { VaccinationSiteInfo } from 'features/vaccination/vaccinationSiteSlice';
import TablePaginationActions from './TablePaginationActions';

interface StyledTablePaginationProps {
  list: VaccinationSiteInfo[] | RegisterResult[] | RegisterInfo[];
}

const StyledTablePagination = ({ list }: StyledTablePaginationProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {emptyRows > 0 && (
        <TableRow sx={{ height: 53 * emptyRows }}>
          <TableCell
            // sx={{ borderBottom: 'none' }}
            colSpan={Object.keys(list[0] || {})?.length}
          />
        </TableRow>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        colSpan={Object.keys(list[0] || {}).length}
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="Số bản ghi:"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
};

export default StyledTablePagination;
