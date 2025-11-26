|   URI              |METHODE|AUTHS?|   DESCRIPTION                 |
|--------------------|-------|------|-------------------------------|
|/films              |  GET  |non   |READ ALL MOVIES                |
|/films/:id          |  GET  |non   |READ MOVIE BY ID               |
|/films              | POST  |JWT   |CREATE A MOVIE                 |
|/films/:id          | PATCH |JWT   |UPDATE A MOVIE                 |
|/films/:id          |DELETE |JWT   |DELETE A MOVIE BY ID           |
|/auths/register     | POST  |non   |REGISTER A USER                |
|/auths/login        | POST  |non   |LOGIN + RETURN JWT TOKEN       |
|/comments           |  GET  |non   |READ ALL COMMENTS              |
|/comments?movieId=ID|  GET  |non   |READ ALL COMMENTS WITH FILTRE  |
|/comments           |  POST |JWT   |POST COMMENTS IN A MOVIE       |
|/comments/:id       |DELETE |JWT   |DELETE COMMENT BY ID           |
