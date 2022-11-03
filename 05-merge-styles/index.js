const fs = require('fs');
const path = require('path');


const directoryPath = path.join(__dirname, 'styles'); //получаем путь к styles

//создаем bandle.css
fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
  if (err) throw err;
});
//Метод fs.readdir() используется для асинхронного чтения содержимого данного каталога.
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
          //создаем поток чтения 3х файлов и закидывания их в bundle.css
          const stream = fs.createReadStream(path.join(directoryPath, file.name));
          let text = '';
          stream.on('data', chunk => text += chunk); //отлавливаем событие когда посутпает data
          stream.on('end', () => { //отлавливаем событие когда data в потоке закончилась
            //Метод fs.appendFile() используется для асинхронного добавления заданных данных в файл
            fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), text, (err) => {
              if (err) throw err;
            });
          });
        }
      });
    }
  });
});