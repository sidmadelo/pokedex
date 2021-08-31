<template>
  <b-card title="Evolution" class="mb-5">
    <b-row>
      <b-col v-for="item in pokemon_evolution" :key="item.id" class="d-flex justify-content-center">
        <NuxtLink :to="`/pokemon/${item.id}`">
          <b-img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`"
            fluid
            alt="Fluid image"
          />
          <p>{{ item.name }} #{{ item.id }}</p>
        </NuxtLink>
      </b-col>
    </b-row>
  </b-card>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('pokemon', [
      'pokemon_evolution'
    ])
  }
}

</script>
