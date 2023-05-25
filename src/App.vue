<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
ul,li{
  list-style: none;
}

 html{
  font-size:calc(100vw / 19.2);
}

body{
  font-size: 16px;
}

</style>
