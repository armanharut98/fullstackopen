const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        </>
    )
}

const Total = ({ total }) => <p><strong>Total of {total} exercises</strong></p>

const Course = ({ course }) => {
    const total = course.parts.reduce((acc, curr) => acc + curr.exercises, 0)
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </>
    )
}

export default Course
