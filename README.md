# The Book Nook - Frontend

React frontend za online knjižaru. Povezuje se na GraphQL backend na `localhost:4000`.

## Tech stack

- React 19
- Vite
- Apollo Client
- React Router

## Pokretanje

```bash
npm install
npm run dev
```

Otvara se na `http://localhost:5173/`.

Backend mora biti pokrenut da bi aplikacija radila.

## Stranice

- `/` - početna stranica
- `/login` - prijava
- `/register` - registracija
- `/books` - pregled i pretraga knjiga po žanrovima
- `/my-books` - kupljene knjige
- `/admin` - dodavanje/brisanje knjiga (admin)

## Struktura

```
src/
  App.jsx              - routing i auth state
  graphql/
    client.js          - Apollo Client konfiguracija
    queries.js         - GraphQL upiti i mutacije
  pages/
    WelcomePage.jsx
    LoginPage.jsx
    RegisterPage.jsx
    BooksPage.jsx
    MyBooksPage.jsx
    AdminPage.jsx
  components/
    Navbar.jsx
    BookCard.jsx
```
