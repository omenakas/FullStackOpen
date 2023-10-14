const Header = (props) => {
    return (
        <h2>{props.course.name}</h2>
    )
}

const Part = ({ part, exercises }) => 
    <p>
    {part} {exercises}
    </p>

const Content = ({ parts, exercises }) => {
    return (
        <>
            <Part
            part={parts[0]} exercises={exercises[0]}
            />
            <Part
            part={parts[1]} exercises={exercises[1]}
            />
            <Part
            part={parts[2]} exercises={exercises[2]}
            />   
            <Part
            part={parts[3]} exercises={exercises[3]}
            />   
        </>
    )
}

const Total = ({ sum }) => <h3>Number of exercises {sum}</h3>

const Course = (props) => {
    
    const parts = props.course.parts.map(part => part.name)
    const exercises = props.course.parts.map(noOf => noOf.exercises)
    const sum = exercises.reduce((s, p) => s + p)

    return (
        <>
            <Header course={props.course} />
            <Content parts={parts} exercises={exercises}/>
            <Total sum={sum} />
        </>
    )
}

export default Course