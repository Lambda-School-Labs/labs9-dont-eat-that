#uploading changes to heroku

- `heroku run knex migrate:rollback -a donteatthat` 
- then `heroku run knex migrate:latest -a donteeatthat`


#changing db tables

- `knex migrate:rollback`
- `knex migrate:latest`

