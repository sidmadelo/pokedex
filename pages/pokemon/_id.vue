<template>
  <b-container v-if="pokemon.name" class="mt-2">
    <b-row class="mb-3">
      <b-col>
        <NuxtLink to="/">
          <b-button>
            Back
          </b-button>
        </NuxtLink>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card :title="`${pokemon.name} #${pokemon.id}`" align="center">
          <b-img :src="pokemon.sprites.front_default" />
          <p>Height: {{ pokemon.height * 10 }}cm</p>
          <p>Weight: {{ pokemon.weight / 10 }}kg</p>
        </b-card>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col>
        <b-card title="Stats">
          <b-list-group>
            <b-list-group-item v-for="item in pokemon.stats" :key="item.name" class="d-flex justify-content-between align-items-center">
              {{ item.stat.name.replace('-', ' ') }}
              <b-badge variant="primary" pill>
                {{ item.base_stat }}
              </b-badge>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>

      <b-col>
        <b-card title="Types">
          <b-list-group>
            <b-list-group-item v-for="item in pokemon.types" :key="item.slot" class="d-flex justify-content-between align-items-center">
              {{ item.type.name }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
      <b-col>
        <Weakness />
      </b-col>
      <b-col>
        <Strength />
      </b-col>
    </b-row>

    <b-row class="my-3">
      <b-col>
        <b-card title="Abilities">
          <b-list-group>
            <b-list-group-item v-for="item in pokemon.abilities" :key="item.slot" class="d-flex justify-content-between align-items-center">
              {{ item.ability.name.replace('-', ' ') }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>

      <b-col>
        <b-card title="Moves">
          <b-list-group style="position:relative; overflow-y:auto; height:300px">
            <b-list-group-item v-for="item in pokemon.moves" :key="item.slot" class="d-flex justify-content-between align-items-center">
              {{ item.move.name.replace('-', ' ') }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Evolution />
      </b-col>
    </b-row>
  </b-container>
  <b-container v-else class="mt-2">
    <b-row class="mb-3">
      <b-col>
        <NuxtLink to="/">
          <b-button>
            Back
          </b-button>
        </NuxtLink>
      </b-col>
    </b-row>
    <SearchPokemon />
    <b-row>
      <b-col>
        <b-card :title="`No Result found for: ${$route.params.id}`" align="center">
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Evolution from '../../components/Evolution.vue'
import Strength from '../../components/Strength.vue'

export default {
  components: { Evolution, Strength },

  computed: {
    ...mapGetters('pokemon', [
      'pokemon'
    ])
  },

  mounted () {
    this.getPokemonDetails(this.$route.params.id)
  },

  methods: {
    ...mapActions({
      getPokemonDetails: 'pokemon/getPokemonDetails'
    })
  }
}
</script>
