#!/usr/bin/env node

var fs = require('fs'),
    program = require('commander'),
    appInfo = require('./package.json');

  program
    .allowUnknownOption()
    .version(appInfo.version)
    .option("-s, --speed <num>", "change print speed by millisecond");

  program
    .command('print <filename>')
    .description('run the given command') 
    .action(function(filename, option) {
      fs.stat(filename, function (err, stats) {
        if (err){
          console.log('the path "'+ filename +'"" does not exits!')
          return;
        }

        if (stats.isFile()) {
          console.log('print file: %s ', filename);
          console.log('let\'s begin...');
          console.log('');
          if (option.speed != undefined && option.speed != '') {
            printText(filename, parseInt(option.speed, 10));
          } else{
            printText(filename, 75);
          }
        } else if (stats.isDirectory ()) {
          console.log("sorry! %s is a directory", filename);
        }
      });
    });

  program.parse(process.argv);

//print text
function printText (filename, speed) {
  fs.createReadStream(filename).on('data', function(data) {
    var data = String(data);
    for (var i = 0; i < data.length; i++) {
      (function (i) {
        setTimeout(function () {    
          if (i == data.length - 1) {
            process.stdout.write(data.charAt(i)+'\n');
          } else{
            process.stdout.write(data.charAt(i));
          };
        }, speed*i)
      })(i);
    };
  });
}
