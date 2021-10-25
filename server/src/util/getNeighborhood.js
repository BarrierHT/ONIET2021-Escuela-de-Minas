const fs = require('fs');
const path = require('path');

const pathDestination = path.join(__dirname, '..', 'resources', 'barrios.json');

// console.log(pathUrl);

// const convert = () => {
//     fs.writeFile(pathDestination, JSON.stringify(convertedObj), err => {});
// };

// convert();

exports.getNeighbourhood = () => {
    return fs
        .readFileSync(pathDestination, (err, fileContent) => {
            console.log(err);
            // console.log(JSON.parse(fileContent));
            return JSON.parse(fileContent);
        })
        .toString();
};
