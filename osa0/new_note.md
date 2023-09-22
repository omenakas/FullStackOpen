´´´mermaid
sequenceDiagram
	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
	activate server

	Note right of browser: The browser sends a post request to the server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
	server-->>browser: HTML document
	deactivate server

´´´
