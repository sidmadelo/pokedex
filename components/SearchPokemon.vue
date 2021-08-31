<template>
  <b-row align-h="end" class="mb-3">
    <b-col sm="6" md="5" class="px-0 d-flex justify-content-end">
      <b-form-input v-model="search" placeholder="Search for pokemon Ex: Charizard or 6" />
      <b-button :to="`/pokemon/${search}`" class="ml-1">
        Search
      </b-button>
    </b-col>
  </b-row>
</template>
<script>

export default {
  data () {
    return {
      search: ''
    }
  }
}

</script>
