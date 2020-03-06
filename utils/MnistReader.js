/**
 File reader for mnist dataset.

 Rescale pixel from 0-255 to 0.01 - 0.99

 _____
 Created by feddot2517 on 05/03/2020.
*/


const fs = require('fs');

module.exports = function (path, callback) {
    const mnistSet = fs.readFileSync(path).toString().split('\n');
    mnistSet.pop();

    mnistSet.forEach(elem => {
        const mnistParse = elem.split(',');
        const imageData = mnistParse.slice(1);

        // Rescale 0-255 pixels to 0.01-0.99
        const imageBuffer = imageData.map(elem => {
            elem = elem/255*0.99;
            if(elem===0) elem+=0.1;
            return elem;
        });

        // Make array of target labels. ex: [0.01, 0.01, 0.01, 0.01, 0.99, 0.01, 0.01, 0.01, 0.01, 0.01]
        const target = Number(mnistParse[0]);
        const targetArray = [];
        for(let i =0; i< 10; i++) {
            if(i===target) targetArray.push(0.99);
            else targetArray.push(0.01);
        }

        callback(imageBuffer, targetArray)
    });
};