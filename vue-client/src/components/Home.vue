<template>
  <div>
    <h3>Registered Authors with Books</h3>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Age</th>
        <th>Books</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="author in authors">
        <td>{{author.name}}</td>
        <td>{{author.email}}</td>
        <td>{{author.age}}</td>
        <td><p v-for="book in author.books">{{book.name}} <sub>{{book.genre}}</sub></p></td>
      </tr>
      </tbody>
    </table>
    <router-view/>
  </div>
</template>

<script>
  import {authorsQuery} from '../graphql/queries'

  export default {
    name: 'Home',
    created() {
      this.$apollo.queries.authors.refetch();
    },
    apollo: {
      authors: {
        query: authorsQuery
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2, h3 {
    font-weight: normal;
    text-align: left;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  table {
    width: 100%;
  }
</style>
