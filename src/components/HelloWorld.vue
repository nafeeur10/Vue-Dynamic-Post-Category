<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <multiselect v-model="value" :options="options"></multiselect>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: { Multiselect },
  data () {
    return {
      value: null,
      options: ['list', 'of', 'options']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
h3 {
  margin: 40px 0 0;
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
</style>
