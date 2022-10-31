const { json } = require('express/lib/response');
const fs = require('fs');
const chalk = require('chalk'); 

const getList = () => {
    const notes = loadNotes();
    notes.forEach(note => { console.log(chalk.blue.inverse(note.title)) });
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const noteDuplicate = notes.find((note) =>{ return title === note.title })
    if (!noteDuplicate) {    
        notes.push({
            title: title,
            body: body
        })   

        saveNotes(notes);
        console.log(chalk.bgGreen("Note added correctly"))
    } else {
        console.log(chalk.bgRed("Title already taken."));
    }

    
}

const saveNotes = (notes) => {
    const notesJson = JSON.stringify(notes); 
    fs.writeFileSync('notes.json', notesJson);
}

const loadNotes = () => {
    try{
        const buffer = fs.readFileSync('notes.json')
        const notesJson = buffer.toString()
        return JSON.parse(notesJson);
    }catch (e) {
        return [];
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => { note.title != title })
    
    if(notes.length != newNotes.length){
        saveNotes(newNotes);
        console.log(chalk.green.inverse("Note removed"))
    }else{
        console.log(chalk.red.inverse("No note found"))
    }
}

const readNote = (title) =>{
    const notes = loadNotes();
    const noteFound = notes.find((note) => note.title === title);
    if(noteFound){
        console.log(chalk.green.inverse(noteFound.title))
        console.log(chalk.green.inverse(noteFound.body))
    }else{
        console.log(chalk.red.inverse("No note found"))
    }
}

module.exports = {
    getList: getList,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}; 