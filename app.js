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
    handler: function(argv){
        // console.log('Title: ' + argv.title);
        // console.log('Body: ' + argv.body);
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
    handler: function(argv){
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command: 'read',
    description: 'Read a note',
    handler: function(){
        console.log("Reading note...")
    }
})

yargs.command({
    command: 'list',
    description: 'Get list of notes',
    handler: function(){
        console.log("Getting list of notes...")
    }
})

yargs.parse();