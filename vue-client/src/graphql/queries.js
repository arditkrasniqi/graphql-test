import gql from 'graphql-tag';

export const authorsQuery = gql`
    query allAuthors {
      authors{
        name
        age
        email
        books{
          name
          genre
        }
      }
    }
  `;
