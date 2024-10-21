import React, { useState } from 'react';
import MatrixTable from './MatrixTable';
import JordanMatrix from './math/JordanMatrix';

const MatrixInput = () => {
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const [tables, setTables] = useState([{
    data: {
      headings: Array(cols).fill(''),
      rows: Array(rows).fill('').map(() => Array(cols).fill('')),
    },
    selectedRadio: { row: -1, col: -1 },
    selected: undefined,
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

    // Получаем координаты выбранного элемента 
    const selectedRow = table.selectedRadio.row;
    const selectedCol = table.selectedRadio.col;

    // Получаем значение из X-таблицы 
    const newRowValue = table.data.rows[0][selectedCol + 1]; // Убедимся, что индекс правильный

    // Создаем новую Y-таблицу с замененным значением 
    const newYTableData = {
      headings: Array(cols - 1).fill(''),
      rows: result.matrixResult.map((row, rowIndex) => {
        if (rowIndex === selectedRow) {
          // Заменяем значение в выбранной строке
          return row.map((cell, index) => (index === selectedCol ? newRowValue : cell));
        }
        return row;
      }),
    };

    // Удаляем ячейку из X-таблицы 
    newYTableData.rows = newYTableData.rows.map((row) => row.filter((_, index) => index !== selectedCol));

    const newTable = {
      data: newYTableData,
      selectedRadio: { row: -1, col: -1 },
      selected: { row: selectedRow, col: selectedCol },
    };
    setTables([...tables, newTable]);
  };

  return (
    <div>
      <h1>Жордановы преобразования</h1>
      <label>
        Сколько строчек:
        <input type="number"
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value, 10))}
        />
      </label>
      <br />
      <label>
        Сколько столбиков:
        <input type="number"
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
            selected={table.selected}
          />
          <button onClick={() => handleJordan(tableIndex)}>Использовать преобразования</button>
        </div>
      ))}
    </div>
  );
};

export default MatrixInput;