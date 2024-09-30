const Matrix = [[-3., 5., -3.], [-1., -2., 2.]];

function JordanMatrix(matrix, kNumber, sNumber) {
  const secondCopy = Array.from(matrix);
  const stringMatrix = secondCopy.toString();
  if (matrix[kNumber][sNumber] == 0) {
    return console.log("Вы пытаетесь выбрать нулевой элемент");
  } else {
    const matrixCopy = matrix.map(row => row.slice()); 
    const matrixResult = matrixCopy.map(row => row.slice()); 
    const acceptElement = matrixResult[kNumber][sNumber];
    for (let i = 0; i < matrixCopy[0].length; i++) { 
      if (i != sNumber) {
        matrixResult[kNumber][i] = matrixCopy[kNumber][i] / acceptElement;
      }
    }
    for (let j = 0; j < matrixCopy.length; j++) { // Update columns
      if (j != kNumber) {
        for (let i = 0; i < matrixCopy[0].length; i++) {
          if (i != sNumber) {
            matrixResult[j][i] =
              (matrixCopy[j][i] * acceptElement - matrixCopy[j][sNumber] * matrixCopy[kNumber][i]) / acceptElement;
          }
        }
        matrixResult[j][sNumber] =
          -matrixCopy[j][sNumber] / acceptElement;
      }
    }
    matrixResult[kNumber][sNumber] = 1 / acceptElement;
    return {
      matrixResult, 
      stringMatrix
    };
  }
}
export default JordanMatrix;



