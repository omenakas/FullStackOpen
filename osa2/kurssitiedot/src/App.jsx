import { useState } from 'react'
import Course from './components/Course'

const MainHeader = ({ name }) => {
  return (
      <h1>{name}</h1>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)

  const course1 = {
    name: 'Half Stack application developement',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  const course2 = {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]

  }

  return (
    <div>
      <MainHeader name='Web Development Curriculum' />
      <Course course={course1} />
      <Course course={course2} />
    </div>
  )
}

export default App
