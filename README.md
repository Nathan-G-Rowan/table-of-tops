# Northcoders Table of Tops API
website URL: https://table-of-tops.onrender.com/

## Summary
This project is an api for making reviews of tabletop games, including a comments and voting system. The api interacts with the database through http methods.

## Cloning and Setup
 
1. In order to clone, navigate to the desired working directory, and run:
    > git clone https://github.com/Nathan-G-Rowan/table-of-tops

2. To install node dependencies, open the root directory,
open the terminal, and run:
    > npm i

    All dependencies should now be installed

If hosting, the next step is to seed the database
seed local database, and run tests


### Creating the .env Files

Next, you must create the required .env files for testing, development, and production.
Create the following files with the quoted contents:
* .env.test
    > PGDATABASE=nc_games_test

* .env.development
    > PGDATABASE=nc_games

Git should already ignore these files, but for your security, please double check that these .env files are in .gitignore.

### Seeding

To seed the development database, run: 
> npm seed

## Testing

If testing any changes to the existing script, write any test files inside of \_\_tests\_\_ directory. In order to make sure you are not tampering with development or production data, make sure any new test files start with the following lines:
> const db = require("../db/connection");
>
> const seed = require("../db/seeds/seed");
>
> const testData = require("../db/data/test-data/");
>
> beforeEach(() => seed(testData));
>
> afterAll(() => db.end());

This will make sure you establish a link to the correct database, then re-seed between every test.

Once your file is ready for testing, run the following command in the terminal:
> npm t YOUR_TEST_FILE_NAME

## Requirements

* Node.js version 1.0.0 or above

* Postgres version 8.7.3 or above