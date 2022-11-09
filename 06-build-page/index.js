const fs = require('fs');
const path = require('path');
const directoryProj = path.join(__dirname, 'project-dist');
const directoryComponents = path.join(__dirname, 'components');

//Метод fs.mkdir() асинхронное создание каталога project-dist
fs.mkdir(directoryProj, { recursive: true }, err => {
  if (err) throw err;
});

//создаем index.html и style.css
fs.writeFile(path.join(directoryProj, 'index.html'), '', (err) => {
  if (err) throw err;
});
fs.writeFile(path.join(directoryProj, 'style.css'), '', (err) => {
  if (err) throw err;
});

//заменяем {{tag}} в template 
const changeTag = () => {
  fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', function (err, templateData) {
    if (err) throw err;
    //читаем template и помещаем в переменную
    let htmlText = templateData;
    //Метод fs.readdir() асинхронное чтение содержимого каталога. callback возвращает массив всех имен файлов в каталоге.
    fs.readdir(path.join(directoryComponents), { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      //проходимся по каждому файлу в каталоге components
      files.forEach((file) => {
        fs.stat(path.join(directoryComponents, file.name), (err) => {
          if (err) throw err;
          if (file.name) {
            fs.readFile(path.join(directoryComponents, file.name), (err, fileData) => {
              if (err) throw err;
              //вырезаем tag из файлов articles.html и др
              let tag = file.name.split(".")[0];
              htmlText = htmlText.replace(new RegExp(`{{${tag}}}`), fileData);
              //вставляем преобразованный html в index.html
              fs.writeFile(path.join(directoryProj, 'index.html'), htmlText, (err) => {
                if (err) throw err;
              });
            });
          };
        });
      });
    });
  });
}
changeTag();

//copy assets
const src = path.join(__dirname, 'assets');
const dest = path.join(directoryProj, 'assets');
//создаем функцию по рекурсированному ассинхронному копированию файлов и диреткорий
const copyAllFiles = (src, dest) => {
  //Метод fs.readdir() асинхронное чтение содержимого каталога. callback возвращает массив всех имен файлов в каталоге.
  fs.readdir(path.join(src), { withFileTypes: true }, function (err, files) {
    if (err) throw err;
    files.forEach(function (file) {
      if (file.isDirectory()) { //проверка на папку встроенным методом, для его работы нужно { withFileTypes: true }
        //Метод fs.mkdir() асинхронное создание каталога
        fs.mkdir(path.join(dest, `${file.name}`), { recursive: true }, (err) => {
          if (err) throw err;
        });
        //рекурсивный вызов для копирования вложенных папок
        copyAllFiles(src + `/${file.name}`, dest + `/${file.name}`);
      } else {
        fs.copyFile(path.join(src, `/${file.name}`), path.join(dest, `/${file.name}`), (err) => {
          if (err) throw err;
        });
      }
    });
  });
};
changeTag();
//каждый раз удаляем содержимое project-dist\assets для поддержания в актуальном состоянии
fs.rm(dest, { recursive: true, force: true }, (err) => { //Метод fs.rm() удаление файла по указанному пути
  if (err) throw err;
  //создаем assets в project и вызываем функцию копирования
  fs.mkdir(path.join(directoryProj, 'assets'), { recursive: true }, (err) => {
    if (err) throw err;
    copyAllFiles(src, dest);
  });
});
changeTag();
//merge styles
const stylePath = path.join(__dirname, 'styles'); //получаем путь к styles
//Метод fs.readdir() используется для асинхронного чтения содержимого данного каталога.
fs.readdir(stylePath, { withFileTypes: true }, function (err, files) {
  if (err) throw err;
  [files[0], files[1], files[2]] = [files[1], files[2], files[0]];
  files.forEach(function (file) {
    if (file.isFile()) {    //проверка является ли файлом с разрешением css
      //Метод fs.stat() возвращает информации о файле или каталоге
      fs.stat(path.join(stylePath, file.name), (err,) => {
        if (err) throw err;
        //Метод path.parse() используется для возврата объекта со свойствами: root, dir, base, ext, name
        const extension = path.parse(file.name).ext;
        if (extension === '.css') {
          //создаем поток чтения 3х файлов и закидывания их в bundle.css
          const stream = fs.createReadStream(path.join(stylePath, file.name));
          let text = '';
          stream.on('data', chunk => text += chunk); //отлавливаем событие когда посутпает data
          stream.on('end', () => { //отлавливаем событие когда data в потоке закончилась
            //Метод fs.appendFile() используется для асинхронного добавления заданных данных в файл
            fs.appendFile(path.join(directoryProj, 'style.css'), `${text} \n`, (err) => {
              if (err) throw err;
            });
          });
        }
      });
    }
  });
});
changeTag();

