import React from 'react'
import {Signup as SignUpComponent, Container } from '../components'


const SignUp = () => {
  return (
    <div>
   <Container>
    <div>
        <div className="py-2">
            <SignUpComponent/>
        </div>
    </div>
   </Container>
    </div>
  )
}

export default SignUp