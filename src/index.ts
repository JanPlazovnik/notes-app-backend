import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as funcs from './functions';

import { Note } from './interfaces';

const port = process.env.PORT || 80;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const notes = express.Router();
app.use('/api/notes', notes);

notes.get('/', (req: express.Request, res: express.Response) => {  // Retrieve all the notes stored in json.
    funcs.GetAllNotes()
        .then((data) => res.status(200).json(data));
});

notes.get('/:id', (req: express.Request, res: express.Response) => {  // Retrieve all the notes stored in json.
    const id = req.params.id;
    funcs.GetNote(id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));    
});

notes.post('/', (req: express.Request, res: express.Response) => { // Store a note in JSON.
    if(!funcs.IsValidColor(req.body.background)) 
        return res.status(422).json({err: 'The background is not in a valid color format.'});

    funcs.AddNote(req.body as Note)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err));    
});

notes.put('/:id', (req: express.Request, res: express.Response) => { // Edit a specific note.
    if(!funcs.IsValidColor(req.body.background)) 
        return res.status(422).json({err: 'The background is not in a valid color format.'});
    
    // const id = parseInt(req.params.id);
    const id = req.params.id;
    funcs.UpdateNote(id, req.body as Note)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json(err))
});

notes.put('/all', (req: express.Request, res: express.Response) => { // Update notes in bulk.

});

notes.delete('/:id', (req: express.Request, res: express.Response) => { // Remove a specific Note.
    // const id = parseInt(req.params.id);
    const id = req.params.id;
    funcs.RemoveNote(id)
        .then((data) => res.status(200).json(data))
        .catch((err) => {
            if(err.includes('500')) // you'd think i'm better than this, but you'd be wrong - i'm lazy, okay?
                res.status(500).json(err)
            else
                res.status(404).json(err);
        })
});

app.get('*', (req: express.Request, res: express.Response) => res.sendStatus(404));

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));