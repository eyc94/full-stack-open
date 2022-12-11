import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { USER, ALL_BOOKS } from '../queries';

const Recommend = (props) => {
  const [me, setMe] = useState(null);
  const [books, setBooks] = useState([]);
  const [meBooks, setMeBooks] = useState([]);

  useQuery(ALL_BOOKS, {
    onCompleted: ({ allBooks }) => {
      setBooks(allBooks);
    },
  });
  useQuery(USER, {
    onCompleted: ({ me }) => {
      setMe(me);
    },
  });

  useEffect(() => {
    if (me) {
      setMeBooks(books.filter(book => book.genres.includes(me.favoriteGenre)));
    }
  }, [me, books]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre <strong>{me.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {meBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
