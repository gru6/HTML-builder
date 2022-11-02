const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);  //входной и выходной параметр


//asynchronously write the specified data to a file
fs.writeFile("02-write-file/text.txt", '', err => {
  if (err) {
    console.error(err);
  } else {
    process.stdout.write('Text me something...' + '\n');
  };

  //обработчик события on (cобытие 'line' выводится всякий раз, когда входной поток получает конец строки (\n, \r или \r\n))
  rl.on('line', (input => {
    if (input.toString() === 'exit') {
      console.log('Good Bay!')
      rl.close();
    } else {
      fs.appendFile("02-write-file/text.txt", input + '\n', err => {    //Метод appendFile используется для асинхронного добавления данных в файл
        if (err) {
          console.error(err);
        } else {
          console.log(`I'm save it in a file...`);
        };

      });
    }
  }));
  rl.on('SIGINT', () => { //Событие 'SIGINT' генерируется, когда стрим input получает ввод <ctrl>-C
    console.log('Are you shure? Good Bye!');
    rl.close();
  });

});
