import React from 'react'
import { Button } from 'antd';
// import 'antd/dist/antd.css'; //Basic
import '../less/antd.less'
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <div>
      Index JSX CSS {process.env.REACT_APP_MY_EN}
      <Button type="primary">Button</Button>
      <Link to="/info">Info</Link>
    </div>
  )
}

export default Index

