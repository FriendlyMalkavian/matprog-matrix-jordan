import React, { useState } from 'react';
import MatrixTable from './MatrixTable';
import JordanMatrix from './math/JordanMatrix'

const MatrixInput = () => {
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const [tables, setTables] = useState([{
    data: {
      headings: Array(cols).fill(''),
      rows: Array(rows).fill('').map(() => Array(cols).fill('')),
    },
    selectedRadio: { row: -1, col: -1 },
  }]);

  const handleCreateTable = () => {
    const newTable = {
      data: {
        headings: Array(cols).fill(''),
        rows: Array(rows).fill('').map(() => Array(cols).fill('')),
      },
      selectedRadio: { row: -1, col: -1 },
    };
    setTables([...tables, newTable]);
  };

  const handleTableCellChange = (tableIndex, rowIndex, cellIndex, value) => {
    const newTables = [...tables];
    newTables[tableIndex].data.rows[rowIndex][cellIndex] = value;
    setTables(newTables);
  };

  const handleRadioChange = (tableIndex, rowIndex, cellIndex) => {
    const newTables = [...tables];
    newTables[tableIndex].selectedRadio = { row: rowIndex, col: cellIndex };
    setTables(newTables);
  };

  const handleJordan = (tableIndex) => {
    const table = tables[tableIndex];
    const matrix = table.data.rows.map((row) => row.map((cell) => parseFloat(cell)));
    const result = JordanMatrix(matrix, table.selectedRadio.row, table.selectedRadio.col);
    const newTableData = {
      headings: Array(cols).fill(''),
      rows: result.matrixResult.map((row) => {
        return row.filter((cell, index) => index !== table.selectedRadio.col);
      }),
    };
    const newTable = {
      data: newTableData,
      selectedRadio: { row: -1, col: -1 },
    };
    setTables([...tables, newTable]);
  };

  return (
    <div>
      <h1>Жордановы преобразования</h1>
      <label>
        Сколько строчек:
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value, 10))}
        />
      </label>
      <br />
      <label>
        Сколько столбиков:
        <input
          type="number"
          value={cols}
          onChange={(e) => setCols(parseInt(e.target.value, 10))}
        />
      </label>
      <br />
      <button onClick={handleCreateTable}>Создать матрицу</button>
      {tables.map((table, tableIndex) => (
        <div key={tableIndex}>
          <MatrixTable
            data={table.data}
            onTableCellChange={(rowIndex, cellIndex, value) => handleTableCellChange(tableIndex, rowIndex, cellIndex, value)}
            onRadioChange={(rowIndex, cellIndex) => handleRadioChange(tableIndex, rowIndex, cellIndex)}
          />
          <button onClick={() => handleJordan(tableIndex)}>Использовать преобразования</button>
        </div>
      ))}
    </div>
  );
};

export default MatrixInput;
