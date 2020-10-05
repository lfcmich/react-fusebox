import React from 'react'
import { Button } from 'antd';
//import 'antd/dist/antd.css'; //Basic
import '../less/antd.less'

const Index = () => {

  return (
    <div>
      Index JSX CSS {process.env.REACT_APP_MY_EN}
      <Button type="primary">Button</Button>
    </div>
  )
}

export default Index

