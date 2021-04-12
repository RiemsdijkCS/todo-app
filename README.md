## About the App

This is a simple Todo-App made for Beeproger. The technology stack of the app is:

- ReactJS (Front-End)
- Laravel (Back-End)
- SCSS +  Bootstrap + Material UI
- SQLite (Database)

## Installation
To start the app (with a SQLite DB) we first need to make an `.env` file and a database. To do this use:
```
cp .env.example .env
composer install
php artisan key:generate
```
Afterwards touch `database.sqlite` in the database repository.

```
cd database/
touch database.sqlite
```

Change `DB_CONNECTION=` -> `DB_CONNECTION=sqlite` and `DB_DATABASE=`  -> `DB_DATABASE=./database/database.sqlite`

After that we can start up the front & back-end. To do this run:

```
php artisan migrate
php artisan storage:link 
npm install
php artisan serve
npm run watch
```

Next go to `localhost:8000` and the app can be used.

