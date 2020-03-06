/**
 Very simple model of Perceptron :)

 _____
 Created by feddot2517 on 05/03/2020.
 */


const Matrix = require('../utils/Matrix');

class Perceptron {
    constructor(inputNodes, hiddenNodes, outputNodes, learningRate) {
        this._inputNodes = inputNodes;
        this._hidenNodes = hiddenNodes;
        this._outputNodes = outputNodes;

        this._learningRate = learningRate;

        this._weightInputHidden = Matrix.random(inputNodes, hiddenNodes);
        this._weightHiddenOutputs = Matrix.random(hiddenNodes, outputNodes);

        this._activateFunction = elem => {
            return 1 / (1 + Math.exp(-elem)); // 1 / (1 + e^-x)
        }

    }

    train(inputsValue, outputsValue) {
        // WAT A HELL_________________________________________________________________________________
        const inputs = Matrix.T(Matrix.fromArray(inputsValue, 1));
        const targets = Matrix.T(Matrix.fromArray(outputsValue, 1));

        const hiddenInputs = Matrix.multiply(inputs, this._weightInputHidden);
        const hiddenOutputs = Matrix.forEachIn(hiddenInputs, this._activateFunction);

        const finalInputs = Matrix.multiply(hiddenOutputs, this._weightHiddenOutputs);
        const finalOutputs = Matrix.forEachIn(finalInputs, this._activateFunction);

        const outputErrors = Matrix.subtract(targets, finalOutputs);

        const hiddenErrors = Matrix.multiply(outputErrors, Matrix.T(this._weightHiddenOutputs),);


        // this._weightHiddenOutputs += this._learningRate * Matrix.multiply((outputError * finalOutputs * (1 - finalOutputs)), Matrix.T(hiddenOutputs))
        const unitMatrixMinusFinalOutputs = Matrix.unitMatrixMinus(finalOutputs);
        const finalOutputsOnLastVar = Matrix.scalarMultiply(finalOutputs, unitMatrixMinusFinalOutputs);
        const outputErrorsOnLastVar = Matrix.multiplyNumber(finalOutputsOnLastVar, outputErrors);
        const transposeHiddenOutputs = Matrix.T(hiddenOutputs);
        const endMultiply= Matrix.multiply(transposeHiddenOutputs, outputErrorsOnLastVar);
        const onLr = Matrix.multiplyNumber(this._learningRate, endMultiply);

        this._weightHiddenOutputs = Matrix.sum(this._weightHiddenOutputs, onLr);



        // this._weightInputHidden += this._learningRate * Matrix.multiply((hiddenErrors * hiddenOutputs * (1 - hiddenOutputs)), Matrix.T(inputs))
        const unitMatrixMinusHiddenOutputs = Matrix.unitMatrixMinus(hiddenOutputs);
        const hiddenOutpursOnLastVar = Matrix.scalarMultiply(hiddenOutputs, unitMatrixMinusHiddenOutputs);
        const hiddenErrorsOnLastVar = Matrix.multiplyNumber(hiddenOutpursOnLastVar, hiddenErrors);
        const transposeInputs = Matrix.T(inputs);
        const end1Multiply= Matrix.multiply(transposeInputs, hiddenErrorsOnLastVar);
        const onLr1 = Matrix.multiplyNumber(this._learningRate, end1Multiply);

        this._weightInputHidden = Matrix.sum(this._weightInputHidden, onLr1);
    }

    query(inputsValue) {
        const inputs = Matrix.T(Matrix.fromArray(inputsValue, 1));

        const hiddenInputs = Matrix.multiply(inputs, this._weightInputHidden, );
        const hiddenOutputs = Matrix.forEachIn(hiddenInputs, this._activateFunction);

        const finalInputs = Matrix.multiply(hiddenOutputs, this._weightHiddenOutputs, );
        const finalOutputs = Matrix.forEachIn(finalInputs, this._activateFunction);

        return finalOutputs[0]
    }
}

module.exports = Perceptron;