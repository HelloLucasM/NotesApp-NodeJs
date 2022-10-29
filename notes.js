const { json } = require('express/lib/response');
const fs = require('fs');
const chalk = require('chalk'); 

const getNotes = () => "Your notes...";

const addNote = (title, body) => {
    const notes = loadNotes();
    const notesDuplicates = notes.filter((note)=>{
        return title === note.title;
    })
    // console.log(notesDuplicates);
    if (notesDuplicates.length === 0) {
        
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
    const newNotes = notes.filter((note) => {
        return note.title != title;
    })
    
    if(notes.length != newNotes.length){
        saveNotes(newNotes);
        console.log(chalk.green.inverse("Note removed"))
    }else{
        console.log(chalk.red.inverse("No note found"))
    }
}

// const findTitle = (title, notes) => {
//     return notes.findIndex( note => note.title === title );
// }; 

// const deleteNote = (index, notes) => {
//    const newNotes = notes.splice(index, 1);
//    saveNotes(newNotes);
// }; 

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}; 