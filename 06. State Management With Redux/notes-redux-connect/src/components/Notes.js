import { connect } from 'react-redux';
import { toggleImportanceOf } from '../reducers/noteReducer';

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  );
};

const Notes = (props) => {
  const dispatch = useDispatch();

  return (
    <ul>
      {props.notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      )}
    </ul>
  );
};

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      notes: state.notes,
    };
  }
  return {
    notes: (state.filter === 'IMPORTANT')
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
  };
};

const ConnectedNotes = connect(mapStateToProps)(Notes);
export default ConnectedNotes;
