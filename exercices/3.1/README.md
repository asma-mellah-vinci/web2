# DOCUMENTATION DE MON API

# API DE FILMS
|   URI              |METHODE|AUTHS?|   DESCRIPTION                 |
|--------------------|-------|------|-------------------------------|
|/films              |  GET  |non   |READ ALL MOVIES                |
|/films/:id          |  GET  |non   |READ MOVIE BY ID               |
|/films              | POST  |JWT   |CREATE A MOVIE                 |
|/films/:id          | PATCH |JWT   |UPDATE A MOVIE                 |
|/films/:id          |DELETE |JWT   |DELETE A MOVIE BY ID           |

# API D'AUTHENTIFICATION
|   URI              |METHODE|AUTHS?|   DESCRIPTION                 |
|--------------------|-------|------|-------------------------------|
|/auths/register     | POST  |non   |REGISTER A USER                |
|/auths/login        | POST  |non   |LOGIN + RETURN JWT TOKEN       |

# API DE COMMENTAIRES
|   URI                 |METHODE|AUTHS?|   DESCRIPTION                 |
|-----------------------|-------|------|-------------------------------|
|/comments?film=filmID  |  GET  |JWT   |READ ALL COMMENTS WITH FILTER  |
|/comments              |  POST |JWT   |POST COMMENTS IN A MOVIE       |
|/comments/films/:filmId|DELETE |JWT   |DELETE COMMENT FOR THE AUTHENTICATED USER ON A MOVIE|
