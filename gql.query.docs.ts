import { gql } from 'apollo-server-express';

export const Login_User_Mutation = gql`
  mutation Login_User_Mutation($input: LoginInput!) {
    login(input: $input) {
      isSuccess
      message
      token
    }
  }
`;

export const Registration_User_Mutation = gql`
  mutation Registration_User_Mutation($input: RegistrationUserInput!) {
    registration(input: $input) {
      isSuccess
      message
      token
    }
  }
`;
