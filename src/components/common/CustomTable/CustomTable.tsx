import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import { ExchangeRate } from 'src/types';

type CustomTableProps = {
  data: ExchangeRate[];
  onRowClick: (row: ExchangeRate) => void;
};

const CustomTable: React.FC<CustomTableProps> = ({ data, onRowClick }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof ExchangeRate | ''>('');
  const [filter, setFilter] = useState<
    Pick<ExchangeRate, 'drzava' | 'drzava_iso' | 'sifra_valute' | 'valuta'>
  >({
    drzava: '',
    drzava_iso: '',
    sifra_valute: '',
    valuta: '',
  });
  const filteredData = data.filter((row) =>
    Object.keys(filter).every((key) =>
      row[key as keyof typeof filter]
        .toLowerCase()
        .includes(filter[key as keyof typeof filter].toLowerCase())
    )
  );
  const sortedData = filteredData.sort((a, b) => {
    if (orderBy) {
      const isAsc = order === 'asc';

      return isAsc
        ? a[orderBy] > b[orderBy]
          ? 1
          : -1
        : a[orderBy] < b[orderBy]
          ? 1
          : -1;
    }

    return 0;
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div>
        {Object.keys(filter).map((key) => (
          <TextField
            key={key}
            name={key}
            label={key}
            value={filter[key as keyof typeof filter]}
            onChange={handleFilterChange}
          />
        ))}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(data[0]).map((headCell) => {
                return (
                  <TableCell key={headCell}>
                    <TableSortLabel
                      active={orderBy === headCell}
                      direction={orderBy === headCell ? order : 'asc'}
                    >
                      {headCell}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.sifra_valute} onClick={() => onRowClick(row)}>
                {Object.values(row).map((cell, index) => (
                  <TableCell key={index}>{cell as React.ReactNode}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomTable;
