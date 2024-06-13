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

import { CellColor } from '../../../enums';
import { ExchangeRate } from '../../../types';
import { formatText } from '../../../utils/formatText';

type CustomTableProps = {
  data: ExchangeRate[];
  sortable?: boolean;
  filterable?: boolean;
  colored?: boolean;
  columnOffset?: number;
  onRowClick?: (row: ExchangeRate) => void;
};

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  sortable = true,
  filterable = true,
  colored = false,
  columnOffset = 2,
  onRowClick,
}) => {
  /**
   * State
   */
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

  /**
   * Methods
   */
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const handleRequestSort = (property: keyof ExchangeRate) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getCellColor = (
    currentExchangeRate: ExchangeRate,
    previousExchangeRate?: ExchangeRate
  ): CellColor => {
    if (!previousExchangeRate) return CellColor.WHITE;

    if (previousExchangeRate.srednji_tecaj > currentExchangeRate.srednji_tecaj)
      return CellColor.ERROR;

    return CellColor.SUCCESS;
  };

  return (
    <div className="custom-table">
      {filterable && (
        <div className="filters-container">
          {Object.keys(filter).map((key) => (
            <TextField
              key={key}
              name={key}
              label={formatText(key)}
              value={filter[key as keyof typeof filter]}
              onChange={handleFilterChange}
            />
          ))}
        </div>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(data[0]).map((headCell, idx) => {
                if (idx >= columnOffset) {
                  return sortable ? (
                    <TableCell key={headCell}>
                      <TableSortLabel
                        active={orderBy === headCell}
                        direction={orderBy === headCell ? order : 'asc'}
                        onClick={() =>
                          handleRequestSort(headCell as keyof ExchangeRate)
                        }
                      >
                        {formatText(headCell)}
                      </TableSortLabel>
                    </TableCell>
                  ) : (
                    <TableCell key={headCell}>{formatText(headCell)}</TableCell>
                  );
                }
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData.map((row, rIdx) => {
              return (
                <TableRow
                  key={`${row.broj_tecajnice}-${row.sifra_valute}`}
                  onClick={() => {
                    if (onRowClick) onRowClick(row);
                  }}
                >
                  {Object.values(row).map((cell, idx) => {
                    if (idx >= columnOffset)
                      return (
                        <TableCell
                          sx={
                            colored
                              ? {
                                  backgroundColor: getCellColor(
                                    row,
                                    data[rIdx + 1]
                                  ),
                                }
                              : null
                          }
                          key={idx}
                        >
                          {cell}
                        </TableCell>
                      );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
