const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin, stdout } = process;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

fs.writeFile("02-write-file/text.txt", '', err => {
    if (err) {
        console.error(err);
    } else {
        stdout.write('Text me something...' + '\n');
    };

    rl.on('line', (input => {
        if (input.toString() === 'exit') {
            console.log('Good Bay!')
            rl.close();
        } else {
            fs.appendFile("02-write-file/text.txt", input + '\n', err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Save it in a file...');
                };

            });
        }
    }));
    rl.on('SIGINT', () => {
        console.log('Are you shure? Good Bye!');
        rl.close();
    });

});
