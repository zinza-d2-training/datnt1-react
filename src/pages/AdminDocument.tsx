import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from 'components/Divider';
import MenuAdmin from 'components/MenuAdmin';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography } from '@mui/material';

import { Document, getDocumentsAsync } from 'features/document/documentSlice';
import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from 'store/index';

const StyledTable = styled(Table)(() => ({
  border: '1px solid #EEEEEE',
  borderRadius: '0',
  padding: '0px 36px',
  margin: 'auto',
  maxWidth: '90%'
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f8f8f8'
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const OrderTableCell = styled(TableCell)``;

const NameTableCell = styled(TableCell)``;

const DownloadTableCell = styled(TableCell)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & > a {
    text-decoration: none;
  }
`;

const DownloadTypography = styled(Typography)`
  color: #ff0000;
  cursor: pointer;

  :hover {
    color: #5faee3;
  }
`;

const AdminDocument = () => {
  const dispatch = useAppDispatch();

  const selectDocuments = useAppSelector(
    (state: RootState) => state.document.documents
  );

  useEffect(() => {
    dispatch(getDocumentsAsync());
  }, []);

  return (
    <div>
      <MenuAdmin adminTab={'document'} />
      <Divider />
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <StyledTable sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <OrderTableCell align="center">Số thứ tự</OrderTableCell>
              <NameTableCell align="left">Tên tài liệu</NameTableCell>
              <DownloadTableCell align="center">Thao tác</DownloadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectDocuments.map((document: Document, index: number) => (
              <StyledTableRow key={index} hover>
                <OrderTableCell align="center">{index + 1}</OrderTableCell>
                <NameTableCell align="left">{document?.name}</NameTableCell>
                <DownloadTableCell align="center">
                  <DownloadIcon />{' '}
                  <a
                    href={`${process.env.REACT_APP_BASE_URL}document/${document.document_id}`}
                    download
                    target={'_blank'}
                    rel="noreferrer">
                    <DownloadTypography>Tải về</DownloadTypography>
                  </a>
                </DownloadTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </div>
  );
};

export default AdminDocument;
