function createMatrix(m, n, value = 0) {
  let matrix = [];

  for (let i = 0; i < m; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      matrix[i][j] = value;
    }
  }

  return matrix;
}
function addMatrices(A, B) {
  let m = A.length;
  let n = A[0].length;

  let result = createMatrix(m, n);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      result[i][j] = A[i][j] + B[i][j];
    }
  }

  return result;
}
