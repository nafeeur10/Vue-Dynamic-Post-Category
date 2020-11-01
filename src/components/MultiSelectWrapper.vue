<template>
  <vue-multiselect v-bind="props" v-on="$listeners" />
</template>

<script>
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'vue-multiselect-wrapper',
  components: {
		VueMultiselect,
	},
  props: {
			value: {}
		},
  created () {
		this.$listeners.input = (data) => {
      this.$emit('input', data, {some: Math.random() * 100})
    }
	},
  computed: {
    props	() {
      return {...this.$attrs, ...this.$props}
    },
	},
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
