# MyReads Project

This repo contains the code for the first project in the [React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019).
> MyReads - A Book Tracking App

## Project Setup

* get the project from github `git clone https://github.com/astehl/reactnd-project-myreads-starter.git`

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Where to find relevant files / some hints concerning folder structure

```bash
├── README.md - This file.
└── src
    └── assets
        └── images # contains app component's image files
    └── components 
        ├── Book.js # Book component
        ├── BookSearch.js # Book Search component
        ├── BookShelf.js # component for a single Book Shelf
        ├── BookShelfChanger.js # component for changing a book's shelf assignment
        └── BookShelfList.js # container component for all relevant BookShelf components
    └── services 
        └── BookAPI.js # wrapper for accessing CRUD backend services: read-write books data, read search results 
    ├── App.js # contains main app component "BooksApp"
```
