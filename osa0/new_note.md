```mermaid
sequenceDiagram
	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
	activate server

	Note right of browser: The browser sends a post request to the server

	Note left of server: 'new_note' initiates a GET for 'note'	

	server-->>browser: HTML document
	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
	activate server
	server-->>browser: the css file
	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
	activate server
	server-->>browser: the JavaScript file
	deactivate server

	Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the 
server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
	activate server
	server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
	deactivate server    

	Note right of browser: The browser executes the callback function that renders the notes

```
