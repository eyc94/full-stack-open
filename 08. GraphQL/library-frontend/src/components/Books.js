import { useState } from 'react';
import { ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState('all');

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks || [];
  const genres = [...new Set(books.flatMap(book => book.genres))];

  return (
    <div>
      <h2>Books</h2>

      <p>Genre Filter: <strong>{genre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books
            .filter(b => genre !== 'all' ? b.genres.includes(genre) : b)
            .map(b => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenre('all')}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
