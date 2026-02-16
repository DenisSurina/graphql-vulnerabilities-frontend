# The Book Nook - Frontend

React frontend for an online bookstore showcasing GraphQL vulnerabilities.

## Tech stack

- React 19
- Vite
- Apollo Client
- React Router

## Getting started

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173/`. Backend must be running.

## Pages

- `/` - landing page
- `/login` - login
- `/register` - registration
- `/books` - browse and search books by genre
- `/my-books` - purchased books
- `/admin` - add/delete books (admin only)

## Project structure

```
src/
  App.jsx              - routing and auth state
  graphql/
    client.js          - Apollo Client config
    queries.js         - GraphQL queries and mutations
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
