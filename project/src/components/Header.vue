<template>
    <header id="header">
        <router-link to="/">Social Program</router-link>
        <router-link to="/dashboard" class="button">Dashboard</router-link>
    </header>
  </template>
  
  <script>
  
  export default {
    name: 'HeaderComponent',
  
  }
  </script>
  
  <style scoped>
    header{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 60px;
        background-color: #202225;
        box-shadow: 0 0 10px rgba(0, 0 , 0, 0.2);
    }

    header a{
        text-decoration: none;
        font-size: 26px;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
    }

    .button{
        color: #fff;
        cursor: pointer;
        border: 0;
        background: transparent;
        padding: 5px 15px;
        outline: none;
        font-weight: bold;
        font-size: 16px;
    }
  </style>
  