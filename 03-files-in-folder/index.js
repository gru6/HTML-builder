const fs = require('fs');
const path = require('path');


const directoryPath = path.join(__dirname, 'secret-folder'); //получаем путь к secret-folder

//Метод fs.readdir() используется для асинхронного чтения содержимого данного каталога
fs.readdir(directoryPath, { withFileTypes: true }, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        if (file.isFile()) {    //проверка является ли файлом

            //Метод fs.stat() возвращает информации о файле или каталоге
            fs.stat(path.join(directoryPath, file.name), (err, stats) => {

                if (err) {
                    console.error(err);
                }
                //Метод path.parse() используется для возврата объекта со свойствами: root, dir, base, ext, name
                const name = path.parse(file.name).name;
                const extension = path.parse(file.name).ext;
                const sise = stats.size; //stats.size — это встроенное свойство класса fs.Stats, для получения размера файла в байтах.
                console.log(`${name} - ${extension.slice(1)} - ${sise / 1000}kb`)
            });
        }
    });
});
