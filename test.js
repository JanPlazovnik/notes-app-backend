let notes = {
    "notes": [
        {
            "name": "the third note",
            "content": "am i updated for realsies?",
            "background": "#123654",
            "updated_at": "2019-12-14T16:47:48.793Z",
            "created_at": "2019-12-14T16:36:42.667Z",
            "id": 2
        },
        {
            "name": "the fourth note",
            "content": "am i updated for real?",
            "background": "#123654",
            "updated_at": "2019-12-14T16:47:20.156Z",
            "created_at": "2019-12-14T16:36:59.120Z",
            "id": 3
        }
    ]
}

let item = notes.notes.find(function(e) {if(e.id == 4) return e; else throw "gay"});
console.log(notes.notes.indexOf(item));