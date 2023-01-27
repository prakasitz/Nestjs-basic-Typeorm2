const fs = require('fs');
const {faker} = require('./node_modules/@faker-js/faker')

const numRows = 600000; // Total number of rows to generate
const batchSize = 60000; // Number of rows per file
const numFiles = Math.ceil(numRows / batchSize); // Number of files to generate

let currentRow = 0;
let currentFile = 0;

let writeStream = fs.createWriteStream(`mock/data${currentFile}.csv`);

// Write the header row
// writeStream.write('id,title,description,isActive,created_date\n');

// Generate and write the mock data rows
while (currentRow < numRows) {
  writeStream.write('id,title,description,isActive,created_date\n');
  let row = '';
  for (let i = 0; i < batchSize; i++) {
    const id = ''
    const title = faker.lorem.sentence(10);
    const description = faker.lorem.paragraph(10);
    const isActive = Math.random() > 0.5 ? 1 : 0;
    const created_date = faker.date.past().toISOString();
    row += `${id},${title},${description},${isActive},${created_date}\n`;
    currentRow++;
  }
  writeStream.write(row);
  currentFile++;
  writeStream.end();
  writeStream.on('finish', () => {
    console.log(`File ${currentFile} written.`);
  });
  writeStream.on('error', (error) => {
    console.error(error);
  });
  writeStream = fs.createWriteStream(`mock/data${currentFile}.csv`);
}

console.log(`Done. ${numFiles} files written.`);