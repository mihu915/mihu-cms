import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      name: 'nonke'
    }
  }
})

export { store }
