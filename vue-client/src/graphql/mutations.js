import gql from 'graphql-tag';

export const authorMutation = gql`
    mutation insertAuthor($name: String!, $age: Int!, $email: String!){
      addAuthor(name: $name, age: $age, email: $email){
        name
        age
        email
      }
    }
  `;

export const bookMutation = gql`
  mutation insertBook($name: String!, $genre: String!, $authorEmail:String!){
    addBook(name: $name, genre: $genre, authorEmail: $authorEmail){
      name
      genre
    }
  }
`;
