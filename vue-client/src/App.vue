<template>
  <div id="app">
    <div class="navBar" id="mainNavBar">
      <a>
        <router-link :to="{name:'Home'}">Home</router-link>
      </a>
      <a>
        <router-link :to="{name:'Author'}">Add Author</router-link>
      </a>
      <a>
        <router-link :to="{name:'Book'}">Add Book</router-link>
      </a>
      <a href="javascript:void(0);" class="icon" @click="openDrawerMenu">&#9776;</a>
      <!--&#9776; is the code for the 3 line menu button-->
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    methods: {
      openDrawerMenu() {
        var x = document.getElementById("mainNavBar");
        if (x.className === "navBar") {
          x.className += " responsive";
        } else {
          x.className = "navBar";
        }
      },
    }
  }
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .container {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .navBar {
    background-color: #009cde;
    overflow: hidden;
    margin-bottom: 60px;
  }

  /*Floats each item to the left with padding of 14 & 16 px.
  Removes the underline with text decoration = none.*/
  .navBar a {
    float: left;
    color: white;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    font-family: Tahoma;
  }

  /*Background color change during hover state*/
  .navBar a:hover {
    background-color: white;
    color: #009cde;
  }

  /*Hides the menu Icon which will show when the nav needs to be responsive*/
  .navBar .icon {
    display: none;
    line-height: 55px;
  }

  /*Set your custom screen width here replacing 700*/
  @media (max-width: 700px) {
    /*Ignores the first link (which is Home) in the div and       applies 'display = none' to everything else.   Basically hiding everything but Home*/
    .navBar a:not(:first-child) {
      display: none;
    }

    /*Brings the menu icon into view and floats it to the right*/
    .navBar a.icon {
      display: block;
      float: right;
    }

    /*The navBar class will be changed to 'navBar responsive' using JS. This chunk of CSS makes the menu icon stay where it is by making the position absolute within it's parent 'right top corner'. Without this, the icon will get kicked around when the items are collapsed and expanded*/
    .navBar.responsive {
      position: relative;
    }

    .navBar.responsive a.icon {
      position: absolute;
      right: 0;
      top: 0;
    }

    /*Removes the originally set float and brings them to view*/
    .navBar.responsive a {
      float: none;
      display: block;
      text-align: left;
    }
  }
</style>
