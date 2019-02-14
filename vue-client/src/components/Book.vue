<template>
  <div>
    <form @submit.prevent="newBook">
      <input type="text" placeholder="name" v-model="name"><br/>
      <input type="text" placeholder="genre" v-model="genre"><br/>
      <input type="text" placeholder="author email" v-model="authorEmail"><br/>
      <button type="submit">Register Book</button>
      <p>{{msg}}</p>
    </form>
  </div>
</template>
<script>
  import { bookMutation } from '../graphql/mutations'

  export default {
    name: 'Book',
    data(){
      return {
        name:'',
        genre:'',
        authorEmail:'',
        msg:''
      }
    },
    methods: {
      newBook() {
        this.$apollo.mutate({
          mutation: bookMutation,
          variables: {
            name: this.name,
            genre: this.genre,
            authorEmail: this.authorEmail
          }
        }).then(() => {
          this.msg = 'Book created successfully';
          this.resetForm();
        });
      },
      resetForm(){
        this.name = '';
        this.genre = '';
        this.authorEmail = '';
      }
    }
  }
</script>
<style scoped>

</style>
