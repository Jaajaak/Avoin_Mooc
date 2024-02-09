import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Courses from './components/Courses'

const App = () => {
  const courses = Courses  

  const Header = (props) => {
    return (
      <h1>
        <p>{props.kurssi}</p>
        </h1>
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
    const kaikki = props.course.parts.reduce((total, part) => {
      console.log('what is happening', total, part)
      return total + part.exercises
    },0)
    
    return (
      <h1>
        Total number of exercises is: {kaikki}
        </h1>
    )
  }


  return (
    <div>
      {courses.map((kurssi) => (
        <div key={kurssi.id}>
          <Header kurssi={kurssi.name} />
          <ul>
            {kurssi.parts.map((part) => (
              <li key={part.id}>
                <Content part={part.name} exercises={part.exercises} />

              </li>
            ))}
          </ul>
          <Total course={kurssi} />
        </div>
      ))}
      
    </div>
  )
}
export default App