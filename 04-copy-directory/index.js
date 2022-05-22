const fs = require('fs');
const path = require('path');
const directory = path.join(__dirname, 'files-copy');




fs.rm(directory, { recursive: true, force: true }, (err) => {
    if (err) {
        console.log('err')
    };

    fs.mkdir(directory, { recursive: true }, err => {
        if (err) {
            console.log('err')
        };
        console.log('Папка была создана');
        fs.readdir(path.join(__dirname, 'files'), function (err, elems) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            elems.forEach(function (elem) {

                fs.copyFile(path.join(__dirname, 'files', elem), path.join(__dirname, 'files-copy', elem), (err) => {
                    if (err) {
                        console.log('err', err)
                    };
                });
            });
        });
    });
});