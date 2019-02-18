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
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="author in authors" :key="author._id">
          <td>{{author.name}}</td>
          <td>{{author.email}}</td>
          <td>{{author.age}}</td>
          <td>
            <p v-for="book in author.books" :key="book._id">
              {{book.name}}
              <sub>{{book.genre}}</sub>
            </p>
          </td>
          <td>
            <button @click="deleteAuthor(author.id)" class="button">X</button>
          </td>
        </tr>
      </tbody>
    </table>
    {{msg}}
    <router-view/>
  </div>
</template>

<script>
import { authorsQuery } from "../graphql/queries";
import { deleteAuthor } from "../graphql/mutations";

export default {
  name: "Home",
  data(){
    return {
      msg: ''
    }
  },
  created() {
    this.$apollo.queries.authors.refetch();
  },
  methods: {
    deleteAuthor(id) {
      this.$apollo
        .mutate({
          mutation: deleteAuthor,
          variables: {
            id: id
          }
        })
        .then((data) => {
          console.log(data);
          this.$apollo.queries.authors.refetch();
        })
        .catch(error => {
          this.msg = error.message;
        });
    }
  },
  apollo: {
    authors: {
      query: authorsQuery
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2,
h3 {
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
