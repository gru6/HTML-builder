const fs = require('fs');
const path = require('path');


const directoryPath = path.join(__dirname, 'secret-folder');
fs.readdir(directoryPath, { withFileTypes: true }, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        if (file.isFile()) {

            fs.stat(path.join(directoryPath, file.name /* ? */), (err, stats) => {
                if (err) {
                    console.error(err);
                }
                // we have access to the file stats in `stats`
                const name = path.parse(file.name).name; /* ? */
                const type = path.extname(file.name);
                const sise = stats.size;
                console.log(`${name} - ${type.slice(1)} - ${sise / 1000}kb`)
            });
        }
    });
});

/* а в Image.jpg не должен файл появиться? */