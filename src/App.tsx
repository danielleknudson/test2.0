import React from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client';
import { Book } from './generated/types';

const GET_BOOKS = gql`
    query GetBooks {
        books {
            title
            author
        }
    }
`

function App() {
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Uh oh, something went wrong</p>;

    const books = data && data.books;

    if (!books) return <p>No books found</p>;

    return (
        <ul>
            {books.map(function(book: Book, index: number) {
                const key = `${index}:${book.title}:${book.author}`
                return <li key={key}>{book.title}, {book.author}</li>
            })}
        </ul>
    );
}

export default App;
