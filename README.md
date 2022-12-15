# Northcoders Table of Tops API
website URL: https://table-of-tops.onrender.com/

# Summary
this project is an api for making reviews of tabletop games, including a comments and voting system. The api interacts with the database through http methods.

If cloning this repo with the intent to run, you must create two .env files for this project:
.env.test: PGDATABASE=nc_games_test
.env.development: PGDATABASE=nc_games
The .gitignore should already contain these files, please double check that these .env files are in .gitignore.