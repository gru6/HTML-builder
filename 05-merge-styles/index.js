const fs = require('fs');
const path = require('path');
const stream = require('stream');
let arr = [];

const directoryPath = path.join(__dirname, 'styles'); //получаем путь к styles
console.log(directoryPath);

fs.readdir(directoryPath, { withFileTypes: true }, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(function (file) {
    if (file.isFile()) {    //проверка является ли файлом с разрешением css

      //Метод fs.stat() возвращает информации о файле или каталоге
      fs.stat(path.join(directoryPath, file.name), (err, stats) => {

        if (err) {
          console.error(err);
        }
        //Метод path.parse() используется для возврата объекта со свойствами: root, dir, base, ext, name
        const extension = path.parse(file.name).ext;

        if (extension === '.css') {
          //TODO написать сюда поток чтения 3х файлов и закидывания их в массив 2. массив в bundle.



        }
      });
    }
  });
});