import * as fs from 'fs';
import { Note, Config } from './interfaces';
import * as uuid from 'uuid/v4';

let json :Config = JSON.parse(fs.readFileSync('./src/notes/notes.json').toString());
let ERROR_FILESAVE :string = "500 - Encountered an error while attempting to save the file.";
let ERROR_NONOTE :string = "404 - The bookmark does not exist.";

const SaveFile = () => {
    try {
        fs.writeFileSync('./src/notes/notes.json', JSON.stringify(json, null, 4));
        return true;
    } catch(ex) {
        console.log(ex);
        return false;
    }
}

const ReadFile = () => {
    return JSON.parse(fs.readFileSync('./src/notes/notes.json').toString()) as Config;
}

export function IsValidColor(value: string) {
    return value.match(/^(#[a-f0-9]{6}|#[a-f0-9]{3}|rgb *\( *[0-9]{1,3}%? *, *[0-9]{1,3}%? *, *[0-9]{1,3}%? *\)|rgba *\( *[0-9]{1,3}%? *, *[0-9]{1,3}%? *, *[0-9]{1,3}%? *, *[0-9]{1,3}%? *\)|black|green|silver|gray|olive|white|yellow|maroon|navy|red|blue|purple|teal|fuchsia|aqua)$/i) ? true : false;
}

export function GetAllNotes() : Promise<Config> {
    return Promise.resolve(json);
}

export function GetNote(id: string) : Promise<Note> {
    return new Promise((resolve, reject) => {
        const item = json.notes.find((e) => e.id === id);
        if (!item) return reject("no match");
        resolve(item);
    });
}

export function AddNote(note: Note) : Promise<Config> {
    return new Promise((resolve, reject) => {
        note.created_at = note.updated_at = new Date();       
        note.id = uuid(); 
        json.notes.push(note);
        if(SaveFile()) 
            resolve(json);
        else {
            json = ReadFile();
            reject(ERROR_FILESAVE);
        }  
    });
}

export function UpdateNote(id: string, note: Note) : Promise<Config> {
    return new Promise((resolve, reject) => {
        const item = json.notes.find((e) => e.id === id);
        if (!item) return reject("no match");
        const newId = json.notes.indexOf(item);
        
        let note_object:Note = {...json.notes[newId], ...note, updated_at: new Date()};
        json.notes[newId] = note_object;
        if(SaveFile()) 
            resolve(json);
        else {
            json = ReadFile();
            reject(ERROR_FILESAVE);
        }
    })
}

export function RemoveNote(id: string) : Promise<Config> {
    return new Promise((resolve, reject) => {
        const item = json.notes.find((e) => e.id === id);
        if (!item) return reject("no match");
        const newId = json.notes.indexOf(item);

        if(json.notes[newId]) {
            json.notes.splice(newId, 1);
            if(SaveFile()) 
                resolve(json);
            else {
                json = ReadFile();
                reject(ERROR_FILESAVE);
            }
        } else {
            reject(ERROR_NONOTE);
        }
    })
}