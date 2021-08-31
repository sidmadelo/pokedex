import axios from 'axios'

export const state = () => ({
  pokemon: {
    sprites: {},
    stats: [],
    types: [],
    abilities: [],
    moves: []
  },
  pokemon_list: [],
  pokemon_evolution: [],
  pokemon_weakness: [],
  pokemon_strength: [],
  nextButton: '',
  prevButton: ''
})

export const mutations = {
  SET_POKEMON_LIST (state, payload) {
    state.pokemon_list = payload
  },
  SET_POKEMON_DETAILS (state, payload) {
    state.pokemon = payload
  },
  SET_POKEMON_EVOLUTION (state, payload) {
    state.pokemon_evolution = payload
  },
  SET_POKEMON_WEAKNESS (state, payload) {
    state.pokemon_weakness = payload
  },
  SET_POKEMON_STRENGTH (state, payload) {
    state.pokemon_strength = payload
  },
  SET_PAGINATION (state, payload) {
    state.nextButton = payload.next
    state.prevButton = payload.prev
  }
}

export const actions = {
  async getPokemonList ({ commit }) {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/')
    const newData = res.data.results.map((item) => {
      const pokeID = item.url.split('/')[6]
      return {
        name: item.name,
        url: item.url,
        id: pokeID
      }
    })

    commit('SET_PAGINATION', { next: res.data.next, prev: res.data.previous })
    commit('SET_POKEMON_LIST', newData)
  },
  async paginatePokemonList ({ commit }, params) {
    const res = await axios.get(params)
    const newData = res.data.results.map((item) => {
      const pokeID = item.url.split('/')[6]
      return {
        name: item.name,
        url: item.url,
        id: pokeID
      }
    })

    commit('SET_PAGINATION', { next: res.data.next, prev: res.data.previous })
    commit('SET_POKEMON_LIST', newData)
  },

  async getPokemonDetails ({ commit }, params) {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params}`)

      const resSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${params}`)
      const resEvolution = await axios.get(resSpecies.data.evolution_chain.url)
      const evolutionChain = []
      const pokemonTypes = []
      const pokemonWeakness = Promise.all(res.data.types.map(async (type) => {
        const resType = await axios.get(type.type.url)
        pokemonTypes.push(type.type.name)
        const strength = resType.data.damage_relations.double_damage_to.map((type) => {
          return type.name
        })

        const weakness = resType.data.damage_relations.double_damage_from.map((type) => {
          return type.name
        })

        return { weakness, strength }
      }))

      let evoData = resEvolution.data.chain

      do {
        const pokeID = evoData.species.url.split('/')[6]

        evolutionChain.push({
          name: evoData.species.name,
          id: pokeID
        })

        evoData = evoData.evolves_to[0]
      } while (!!evoData && Object.prototype.hasOwnProperty.call(evoData, 'evolves_to'))

      pokemonWeakness.then((resWeakness) => {
        const allWeakness = []
        const allStrength = []

        resWeakness.forEach((data) => {
          allWeakness.push(...data.weakness)
          allStrength.push(...data.strength)
        })
        const newWeakness = [...new Set(allWeakness)]
        const newStrength = [...new Set(allStrength)]

        const filteredWeakness = newWeakness.filter((type) => {
          return !newStrength.includes(type) && !pokemonTypes.includes(type)
        })

        const filteredStrength = newStrength.filter((type) => {
          return !newWeakness.includes(type) && !pokemonTypes.includes(type)
        })

        commit('SET_POKEMON_WEAKNESS', filteredWeakness)
        commit('SET_POKEMON_STRENGTH', filteredStrength)
      })

      commit('SET_POKEMON_DETAILS', res.data)
      commit('SET_POKEMON_EVOLUTION', evolutionChain)
    } catch (error) {
      commit('SET_POKEMON_WEAKNESS', [])
      commit('SET_POKEMON_STRENGTH', [])
      commit('SET_POKEMON_DETAILS', {})
      commit('SET_POKEMON_EVOLUTION', [])
    }
  }
}

export const getters = {
  pokemon_evolution: state => state.pokemon_evolution,
  pokemon_weakness: state => state.pokemon_weakness,
  pokemon_strength: state => state.pokemon_strength,
  pokemon_list: state => state.pokemon_list,
  pokemon: state => state.pokemon,
  nextButton: state => state.nextButton,
  prevButton: state => state.prevButton
}
