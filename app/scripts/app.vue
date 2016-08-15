<template>
  <div>
    <div class="container-fluid" id="main-container">
      <div id="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  var Config  = require('config.vue');

  module.exports = {
    data: function () {
      return {
        api_url:    Config.api_url,
      }
    },
    methods: {
      //
    },
    computed: {
      // 
    }
  };
</script>
