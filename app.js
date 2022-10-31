// const validator = require('validator');
// console.log(validator.isEmail('foo@bar')); //=> true
const chalk = require('chalk'); 
const yargs = require('yargs'); 
const notes = require('./notes'); 
// const log = console.log; 
// log(chalk.green(getNotes()));

//create command 
yargs.command({
    command: 'add',
    description: 'Add a new note',
    builder: {
        title:{
            description: 'Note title',
            demandOption: true,
            type:'string'
        },
        body:{
            description: 'Note body',
            demandOption: true,
            type:'string'
        }
        
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    description: 'Remove a new note',
    builder:{
        title: {
            description: 'Note body to remove',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command: 'read',
    description: 'Read a note',
    builder:{
        title: {
            description: 'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
})

yargs.command({
    command: 'list',
    description: 'Get list of notes',
    handler(){
        notes.getList(); 
    }
})

yargs.parse();