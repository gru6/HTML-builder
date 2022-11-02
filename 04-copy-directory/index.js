const fs = require('fs');
const path = require('path');
const directory = path.join(__dirname, 'files-copy');

fs.rm(directory, { recursive: true, force: true }, (err) => { //Метод fs.rm() удаление файла по указанному пути
    if (err) {
        console.log('err')
    };

    fs.mkdir(directory, { recursive: true }, err => { //Метод fs.mkdir() асинхронное создание каталога
        if (err) {
            console.log('err')
        };
        console.log('Папка была создана');

        //Метод fs.readdir() асинхронное чтение содержимого каталога. callback возвращает массив всех имен файлов в каталоге.
        fs.readdir(path.join(__dirname, 'files'), function (err, elems) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            elems.forEach(function (elem) { //перебираем все файлы 
                //Метод fs.copyFile() асинхронно копирует файл из исходного пути в целевой
                fs.copyFile(path.join(__dirname, 'files', elem), path.join(__dirname, 'files-copy', elem), (err) => {
                    if (err) {
                        console.log('err', err)
                    };
                });
            });
        });
    });
});