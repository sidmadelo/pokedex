<template>
  <b-card title="Strength">
    <b-list-group>
      <b-list-group-item v-for="item in pokemon_strength" :key="item" class="d-flex justify-content-between align-items-center">
        {{ item }}
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('pokemon', [
      'pokemon_strength'
    ])
  }
}

</script>
