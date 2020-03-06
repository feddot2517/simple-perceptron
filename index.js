const Ai = require('./models/Perceptron');
const MnistRead = require('./utils/MnistReader');
const fs = require("fs");

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

const neuralNetwork = new Ai(784, 100, 10, 0.2);

let accuracy = 0;
let checkedCounter = 0;
let counter = 0;
MnistRead('./dataset/mnist/mnist_train.csv',  (input, target) => {
    neuralNetwork.train(input, target);
    counter++;
    if(counter%10000===0) console.log(`${counter}/60000`);

    if(counter%200===0) {
        MnistRead('./dataset/mnist/mnist_train_100.csv', (input, target)=>{
            checkedCounter+=1;
            const response = neuralNetwork.query(input);
            const responseMax = getMaxOfArray(response);
            const targetMax = getMaxOfArray(target);
            if(response.indexOf(responseMax)===target.indexOf(targetMax)) {
                accuracy+=1;
            }
            if(checkedCounter===100) {
                console.log(`${accuracy/100*100}% точность`);
                fs.writeFileSync('./weight.txt', neuralNetwork._weightInputHidden);
                fs.appendFileSync('./weight.txt', `\n${neuralNetwork._weightHiddenOutputs}`)
            }
        });
        checkedCounter=0;
        accuracy=0;
    }
} );
