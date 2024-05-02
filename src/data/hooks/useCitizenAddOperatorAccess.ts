import { gql, useMutation } from '@apollo/client';

const MY_CITIZEN_ADD_OPERATOR_ACCESS = `
  mutation myCitizenAddOperatorAccess($operatorAccess: [ID!]!, $activationCode: String) {
    myCitizenAddOperatorAccess(
      operatorAccess: $operatorAccess,
      activationCode: $activationCode
    ) {
      _id
      email
      operatorAccess {
        _id
        culturalOperator {
          name
        }
      }
    }
  }
`;

export function useCitizenAddOperatorAccess(): {
  loading: boolean;
  error: any;
  data: any;
  runMutation: (options: any) => Promise<any>;
} {
  const [runMutation, { data, loading, error }] = useMutation(gql`
    ${MY_CITIZEN_ADD_OPERATOR_ACCESS}
  `);

  return { loading, error, data, runMutation };
}
