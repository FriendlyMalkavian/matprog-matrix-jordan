import React from 'react';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';

function MatrixTable({ data, onTableCellChange, onRadioChange }) {
  return (
    <Container className="responsive-container">
      <Table className="table-responsive" bordered striped>
        <tbody>
          <tr>
            {data.headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
          {data.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>
                  <input
                    type="number"
                    value={cell}
                    onChange={(e) => onTableCellChange(rowIndex, cellIndex, e.target.value)}
                  />
                  <input
                    type="radio"
                    name={`radio-${rowIndex}-${cellIndex}`}
                    onChange={() => onRadioChange(rowIndex, cellIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default MatrixTable;
