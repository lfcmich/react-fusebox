import React from 'react'

const Index = () => {

  console.log(process.env)

  return (
    <div>
      Index JSX {process.env.TEST}
    </div>
  )
}

export default Index

