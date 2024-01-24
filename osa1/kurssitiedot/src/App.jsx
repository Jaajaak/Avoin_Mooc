const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
      <div>
  
        <p>This course is: {props.course}</p>
      </div>
    )
  }

  const Content = (props) => {
    return (
      <div>
        This part of the course is {props.part} and it has {props.exercises} exercises
      </div>
    )
  }

  const Total = (props) => {
    return (
      <div>
        Total number of exercises is: {props.total}
      </div>
    )
  }


  return (
    <div>
       <h1>Kurssitiedot</h1>
      <Header course={course.name} />
      <Content part={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Content part={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Content part={course.parts[2].name} exercises={course.parts[2].exercises} />
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}
export default App
