import React from 'react';
import { Form, Formik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap'
import { NextRouter, useRouter } from 'next/router';
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
`;

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router: NextRouter = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, {setErrors} ) => {
          console.log(values);
          const response =  await register(values); // setup response types using graphql codegen
          if (response.data?.register.errors) {
              setErrors(
                 toErrorMap(response.data.register.errors)
              )
        } else if (!response.data?.register.errors) {
            // successful registration
            console.log("SUCCESS pushing route")
            router.push("/")
        }
          return response
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
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
            >
              {' '}
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
