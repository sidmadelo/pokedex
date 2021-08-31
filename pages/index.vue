<template>
  <div class="mt-5">
    <b-container>
      <SearchPokemon />
      <b-row>
        <b-col v-for="item in pokemon_list" :key="item.id" sm="4" md="2" class="d-flex justify-content-center">
          <NuxtLink :to="`pokemon/${item.id}`">
            <b-img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`"
              fluid
              alt="Fluid image"
            />
            <p>{{ item.name }} #{{ item.id }}</p>
          </NuxtLink>
        </b-col>
      </b-row>
      <b-row align-h="between">
        <b-button
          :disabled="!prevButton"
          @click="paginatePokemonList(prevButton)"
        >
          Previous
        </b-button>
        <b-button
          :disabled="!nextButton"
          @click="paginatePokemonList(nextButton)"
        >
          Next
        </b-button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {

  computed: {
    ...mapGetters('pokemon', [
      'pokemon_list',
      'nextButton',
      'prevButton'
    ])
  },

  mounted () {
    this.getPokemonList()
  },

  methods: {
    ...mapActions({
      getPokemonList: 'pokemon/getPokemonList',
      paginatePokemonList: 'pokemon/paginatePokemonList'
    })
  }
}
</script>
