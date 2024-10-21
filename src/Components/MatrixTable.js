import React from 'react';
import Table from 'react-bootstrap/Table';
import { Container } from 'react-bootstrap';

function MatrixTable({ data, onTableCellChange, onRadioChange }) {
  return (
    <Container className="responsive-container">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* Empty cell to align with y table */}
          <div style={{ width: '100px', marginRight: '10px' }}></div>

          {/* Table for x values */}
          <Table style={{ marginBottom: '0' }}>
            <thead>
              <tr>
                <th style={{ paddingLeft: '0' }}>1</th> {/* Первый заголовок без 'x' */}
                {Array.from({ length: data.headings.length - 1 }, (_, index) => (
                  <th key={index + 1} style={{ paddingLeft: '150px' }}>x{index + 1}</th> // Начинаем с x1
                ))}
              </tr>
            </thead>
          </Table>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* Table for y values */}
          <Table style={{ marginRight: '10px' }}>
            <tbody>
              {data.rows.map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td>y{rowIndex + 1}</td> {/* y1, y2, ..., ym */}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Main table */}
          <Table className="table-responsive" bordered striped>
            <thead>
              <tr>
                {data.headings.map((heading, index) => (
                  <th key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <input type="number"
                        value={cell}
                        onChange={(e) => onTableCellChange(rowIndex, cellIndex, e.target.value)}
                      />
                      <input type="radio"
                        name={`radio-${rowIndex}-${cellIndex}`}
                        onChange={() => onRadioChange(rowIndex, cellIndex)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
}

export default MatrixTable;

