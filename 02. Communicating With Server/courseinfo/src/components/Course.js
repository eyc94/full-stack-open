const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  const total = props.course.parts.reduce(
    (sum, currentValue) => sum + currentValue.exercises, 0
  );

  return (
    <p>
      <strong>Total exercises: {total}</strong>
    </p>
  );
};

const Course = (props) => {
  return (
    <>
      {props.courses.map(course => (
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      ))}
    </>
  );
};

export default Course;
