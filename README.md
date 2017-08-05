# story-parser
A parser for choose your own adventure stories with optional combat system 

Story Parser uses parser combinators to turn a simple text format into a JavaScript object.

## Example Story
The main parser expects a series of numbered pages with options that each point to the number of another page. The dashes that separate the pages are optional. Pages that end the story must be terminated with the `(end)` keyword.

Input text:
```
PAGE 0
"You are in a room, there is a door to the left and a door to the right.
It is a dark room."
OPTION 1
"Take the door on the left"
OPTION 2
"Take the door on the right"
OPTION 3
"Take the door at the end of the hall"
--------------------------------------
PAGE 3
"The hall ends in lava, you die!"
(end)
--------------------------------------
PAGE 1
"You are in an empty room."
OPTION 0
"Go back"
--------------------------------------
PAGE 2
"You are in a bright green field, you made it!"
(end)
```

Output JS:
```javascript
{
  "type":"SIMPLE",
  "pages":[
    {
      "id":0,
      "text":"You are in a room, there is a door to the left and a door to the right.\nIt is a dark room.",
      "options":[
        {"target":1,"text":"Take the door on the left"},
        {"target":2,"text":"Take the door on the right"},
        {"target":3,"text":"Take the door at the end of the hall"}]
    },
    {
      "id":3,
      "text":"The hall ends in lava, you die!",
      "options":"END"
    },
    {
      "id":1,
      "text":"You are in an empty room.",
      "options":[
        {"target":0,"text":"Go back"}
        ]
    },
    {
      "id":2,
      "text":"You are in a bright green field, you made it!",
      "options":"END"
    }
  ]
}
```
