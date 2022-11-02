const fs = require('fs'); //file system
const path = require('path');
const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
//__dirname возвращает полный путь к дериктории D:\RSS_Stage1\HTML-builder\01-read-file
// метод join скрепляет все строки в нормальный путь к файлу text.txt

readableStream.on('data', chunk => console.log(chunk));