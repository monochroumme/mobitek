import apiRequest from '~/utils/apiRequest'

export const state = () => ({
  products: [],
  totalProducts: 0,
  brands: [],
  connectors: [],
  colors: []
})

export const mutations = {
  SET_PRODUCTS: (state, payload) => state.products = payload,
  SET_TOTAL_PRODUCTS: (state, payload) => state.totalProducts = payload,
  SET_BRANDS: (state, payload) => state.brands = payload,
  SET_CONNECTORS: (state, payload) => state.connectors = payload,
  SET_COLORS: (state, payload) => state.colors = payload
}

export const actions = {
  async getProducts({ commit }, data) {
    let query = '';
    if (data) {
      query = Object.keys(data).map(key => {
        return key + '=' + data[key]
      }).join('&');
    }

    const res = await apiRequest.get(`products?${query}`);
    if (res && res.data) {
      if (res.data.data)
        commit('SET_PRODUCTS', res.data.data);
      else commit('SET_PRODUCTS', []);
      if (res.data.total)
        commit('SET_TOTAL_PRODUCTS', res.data.total);
      else commit('SET_TOTAL_PRODUCTS', 0);
    } else {
      commit('SET_PRODUCTS', []);
      commit('SET_TOTAL_PRODUCTS', 0);
    }
  },

  async getBrands({ commit }) {
    const res = await apiRequest.get('brands');
    if (res && res.data && res.data.data)
      commit('SET_BRANDS', res.data.data);
  },

  async getConnectors({ commit }, data) {
    const res = await apiRequest.get('devices');
    if (res && res.data && res.data.data)
      commit('SET_CONNECTORS', res.data.data);
  },

  async getColors({ commit }, data) {
    const res = await apiRequest.get('colors');
    if (res && res.data && res.data.data)
      commit('SET_COLORS', res.data.data);
  }
}
