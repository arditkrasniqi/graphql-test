<template>
  <div>
    <form @submit.prevent="newAuthor">
      <input type="text" placeholder="name" v-model="name">
      <br>
      <input type="text" placeholder="age" v-model="age">
      <br>
      <input type="text" placeholder="email" v-model="email">
      <br>
      <button type="submit">Register Author</button>
      <p>{{msg}}</p>
    </form>
  </div>
</template>
<script>
import { authorMutation } from "../graphql/mutations";
import { authorsQuery } from "../graphql/queries";

export default {
  name: "Author",
  data() {
    return {
      name: "",
      age: "",
      email: "",
      msg: ""
    };
  },
  methods: {
    newAuthor() {
      this.$apollo
        .mutate({
          mutation: authorMutation,
          variables: {
            name: this.name,
            email: this.email,
            age: parseInt(this.age)
          }
        })
        .then(() => {
          this.msg = "Author created successfully";
          this.$apollo.queries.authors.refetch();
          this.resetForm();
        })
        .catch(error => {
          this.msg = error.message;
        });
    },
    resetForm() {
      this.name = "";
      this.age = "";
      this.email = "";
    }
  },
  apollo: {
    authors: {
      query: authorsQuery
    }
  }
};
</script>
<style scoped>
</style>
