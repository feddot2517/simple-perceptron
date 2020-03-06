/**
 Simple matrix operation class

 _____
 Created by feddot2517 on 05/03/2020.
*/



class Matrix {
    static scalarMultiply(matrix1, matrix2) {
        const scalar1 = matrix1.reduce(function(a, b) {
            return a.concat(b);
        });

        const scalar2 = matrix2.reduce(function(a, b) {
            return a.concat(b);
        });

        let result = 0;
        for( let i=0; i < scalar1.length; ++i )
        {
            result += scalar1[i] * scalar2[i];
        }
        return result
    }

    static makeUnitMatrix(rows, columns) {
        const arr = [];
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
            for (let j = 0; j < columns; j++) {
                arr[i][j] = 1;
            }
        }
        return arr;
    }

    static fromArray(arr, size) {
        const res = [];
        for (let i = 0; i < arr.length; i = i + size)
            res.push(arr.slice(i, i + size));
        return res;
    }

    static T(matrix) {
        const m = matrix.length, n = matrix[0].length, AT = [];
        for (let i = 0; i < n; i++) {
            AT[i] = [];
            for (let j = 0; j < m; j++) AT[i][j] = matrix[j][i];
        }
        return AT;
    }

    static unitMatrixMinus(matrix) {
        const unitMatrix = this.makeUnitMatrix(matrix.length, matrix[0].length);
        return this.subtract(unitMatrix, matrix);
    }

    static multiply(A, B) {
        const rowsA = A.length, colsA = A[0].length,
            rowsB = B.length, colsB = B[0].length,
            C = [];
        if (colsA !== rowsB) throw new Error('matrix multiply colsA !== rowsB');
        for (let i = 0; i < rowsA; i++) C[i] = [];
        for (let k = 0; k < colsB; k++) {
            for (let i = 0; i < rowsA; i++) {
                let t = 0;
                for (let j = 0; j < rowsB; j++) t += A[i][j] * B[j][k];
                C[i][k] = t;
            }
        }
        return C;
    };

    static subtract(matrix1, matrix2) {
        const minusMatrix2 = this.multiplyNumber(-1, matrix2);

        return this.sum(matrix1, minusMatrix2);
    }

    static sum(matrix1, matrix2) {
        const m = matrix1.length, n = matrix1[0].length, C = [];
        for (let i = 0; i < m; i++) {
            C[i] = [];
            for (let j = 0; j < n; j++) {
                C[i][j] = matrix1[i][j] + matrix2[i][j];
            }
        }
        return C;
    }

    static multiplyNumber(a, A) {
        const m = A.length, n = A[0].length, B = [];
        for (let i = 0; i < m; i++) {
            B[i] = [];
            for (let j = 0; j < n; j++) {
                B[i][j] = a * A[i][j];
            }
        }
        return B;
    }

    static random(rows, columns) {
        const arr = [];
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
            for (let j = 0; j < columns; j++) {
                arr[i][j] = Math.random() - 0.5;
            }
        }
        return arr;
    };

    static forEachIn(matrix, func) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                matrix[i][j] = func(matrix[i][j])
            }
        }
        return matrix;
    }
}

module.exports = Matrix;