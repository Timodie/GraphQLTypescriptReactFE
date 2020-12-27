import React from 'react' 
import { Form, Formik } from 'formik'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useMutation } from 'urql';


interface registerProps {}

const REGISTER_MUTATION = `
mutation Register ($username: String!, $password:String!) {
  register(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
    }
  }
}
`


 const Register: React.FC<registerProps> = ({}) => {
     const [, register] = useMutation(REGISTER_MUTATION)
        return (
            <Wrapper variant="small">
            <Formik
             initialValues={{ username: "", password: ""}}
             onSubmit={(values) => {
                 console.log(values);
                 return register(values) // resolved promise 
             }}
            >
                { ({values, handleChange, isSubmitting}) => (
              <Form>
               <InputField 
                 name="username"
                 placeholder="Username"
                 label="username"
            
               />
               <Box mt={4}> 
                <InputField 
                  name="password"
                  placeholder="password"
                  label="password"
                  type="password"           
               />
               </Box>
               <Button 
                  type="submit" 
                  colorScheme="teal" 
                  mt={4}  
                  isLoading={isSubmitting}
                  > register</Button>        
              </Form>
                )
                }
            </Formik>
            </Wrapper>
        );
}

export default Register;