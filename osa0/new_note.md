sequenceDiagram
	participant Browser
	participant Server

	browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
	activate server
	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
	server-->>browser: HTML document
	deactivate server


