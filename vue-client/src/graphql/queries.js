import gql from 'graphql-tag';

export const authorsQuery = gql`
    query allAuthors {
      authors{
        id
        name
        age
        email
        books{
          id
          name
          genre
        }
      }
    }
  `;
