const Header = ({course}) => {
    //console.log(props)
    return  <h2> {course.name} </h2>
    
  }
  
  const Part = ({part}) => {
    return(
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    return(
    <ul>
        {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
    </ul>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((s,p) => s + p.exercises,0)
    return (
      <strong style={{ marginLeft: '2.5em' }}> 
        Total of {total} exercises
      </strong>
    );
  }
  
  const Course = ({course}) => {
    return(
      <div>
         <Header course={course} />
         <Content parts = {course.parts} />
         <Total parts = {course.parts} />
      </div>
    )
  }

export default Course