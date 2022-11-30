const App = (props) => {
  const { notes } = props;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <li>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  );
};

export default App;
