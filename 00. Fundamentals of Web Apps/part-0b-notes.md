# Fundamentals of Web Apps

- Should always keep the developer console open.
- On the Mac, pressing `F12` or `option-cmd-i`.
- On Windows or Linux, press `F12` or `ctrl-shift-i`.
- Open the `Network` tab.
  - Check `Disable Cache`.
  - The `Preserve log` can also be useful.
    - Saves logs printed by the application when the page is reloaded.


## HTTP GET
- The browser and server communicates using the `HTTP` protocol.
- The `Network` tab shows this communication.
- `Sequence Diagrams` are used to show the requests and responses.
  - See the link for more information: [Link](https://www.geeksforgeeks.org/unified-modeling-language-uml-sequence-diagrams/)


## Traditional Web Applications
- Referring to the example app:
  - Works like a traditional web app.
  - The browser fetches HTML document with structure and textual content of the page from the server.
  - The server formed the document.
  - Document can be a `static` text file in the server's directory.
  - Server can also form the HTML documents `dynamically`.
- The HTML code of the example homepage:
```js
const getFrontPageHtml = (noteCount) => {
  return (`
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <div class='container'>
          <h1>Full stack example app</h1>
          <p>number of notes created ${noteCount}</p>
          <a href='/notes'>notes</a>
          <img src='kuva.png' width='200' />
        </div>
      </body>
    </html>
  `);
};

app.get('/', (req, res) => {
  const page = getFrontPageHtml(notes.length);
  res.send(page);
});
```
- The content of HTML page is saved as a template string, or a string that allows for evaluating variables in the middle.
- Dynamic part is the number of notes.
- Writing HTML in code is not smart.
- Server can be created using Java Spring, Python Flask, or with Ruby on Rails.
- The example uses the `Express` library with `Node.js`.
  - We use this to create servers in this class.


## Running Application Logic In The Browser
- Notice that the HTML code returned by the server does not contain the list of notes.
- The `head` section contains a `script` tag.
  - This causes the browser to fetch a JavaScript file called `main.js`.
- This is `main.js`:
```js
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText);
    console.log(data);

    var ul = document.createElement('ul');
    ul.setAttribute('class', 'notes');

    data.forEach(function(note) {
      var li = document.createElement('li');

      ul.appendChild(li);
      li.appendChild(document.createTextNode(note.content));
    });

    document.getElementsByClassName('notes').appendChild(ul);
  }
};

xhttp.open('GET', '/data.json', true);
xhttp.send();
```
- Browser executes this code after receiving this JS file.
- The browser is told to make an HTTP GET request to the server's address `/data.json`.
- This data is in the `JSON` format.
- The JS code downloads the JSON data with all the notes and forms a bullet-point list.


## Event Handlers and Callback Functions
- Code to send request comes after the code that handles the response.
- An `event handler` for event `onreadystatechange` is defined for `xhttp` object doing the request.
  - When state of object changes, the browser calls the event handler function.
  - Function code checks `readyState` equals 4, meaning operation complete and status code of 200.
- Event handler functions are called `callback` functions.
- App code does not invoke the function, but the runtime environment (browser) invokes the function at an appropriate time.
  - i.e. when the event occurs.


## Document Object Model or DOM
- HTML pages are implicit tree structures.
- The `Document Object Model`, or `DOM`, is an `Application Programming Interface (API)` which allows modifications of web pages.


## Manipulating the Document-Object From Console
- Topmost node of the DOM is called the `document` object.
- Can use DOM-API.
- Access `document` object by typing `document` in console tab.
- Changes made with the DOM-API in the console are not permanent.
  - Resets after refresh.


## CSS
- The `head` element has a `link` tag.
- This determines the browser must fetch a `CSS` style sheet from `main.css`.
- CSS is a style sheet language used to determine the appearance of web pages.
- Example:
```css
.container {
  padding: 10px;
  border: 1px solid;
}

.notes {
  color: blue;
}
```
- There are two class selectors.
  - Starts with a period and contains the name of the class.
- Classes are attributes.
- CSS attributes can be examined on the elements tab of the console.


## Loading A Page Containing JavaScript - Review
1. The browser fetches HTML code with an HTTP GET request.
2. Links in the HTML code cause the browser to fetch CSS style sheet `main.css`.
3. Also fetches the JavaScript code `main.js`.
4. The browser executes JS code and returns the JSON data for notes.
5. When the data is fetched, browser executes and event handler to render the notes to the page using the DOM-API.


## Forms and HTTP POST
- The notes page has a form element.
- When the button is clicked, the browser sends the input to the server.
- Open the `Network` tab to see what the form is submitting.
- Notice a POST request to the address `new_note`.
- The form tag has attributes `action` and `method`.
  - Defines that submitting the form is an HTTP POST request to the address `new_note`.
- The code on the server making the POST request is:
```js
app.post('/new_note', (req, res) => {
  notes.push({
    content: req.body.note,
    date: new Date(),
  });

  return res.redirect('/notes');
});
```
- Data is sent as the body of the POST request.
- Server can access the data by accessing `req.body` field of the request object `req`.
- The server creates a new note object, and adds it to an array called `notes`.
- The Note objects have two fields: `content` and `date`.
- The server does not save new notes to a database, so the notes disappear when the server is restarted.


