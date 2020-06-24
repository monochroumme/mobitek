import apiRequest from '~/utils/apiRequest'

export const state = () => ({
    welcome: [],
    banners: [],
    videos: [],
    about: [],
    product: {},
    certificates: [],
    productSlides: {
        top: [],
        best: [],
        editor: []
    },
    catsProducts: [],
    categories: [],
    contacts: []
})

export const mutations = {
    SET_WELCOME: (state, payload) => state.welcome = payload,
    SET_BANNERS: (state, payload) => state.banners = payload,
    SET_VIDEOS: (state, payload) => state.videos = payload,
    SET_ABOUT: (state, payload) => state.about = payload,
    SET_DOCS: (state, payload) => state.certificates = payload,
    SET_PRODUCTS_SLIDER_TOP: (state, payload) => state.productSlides.top = payload,
    SET_PRODUCTS_SLIDER_BEST: (state, payload) => state.productSlides.best = payload,
    SET_PRODUCTS_SLIDER_EDITOR: (state, payload) => state.productSlides.editor = payload,
    SET_PRODUCT: (state, payload) => state.product = payload,
    SET_CATS: (state, payload) => state.categories = payload,
    SET_CATS_PRODUCT: (state, payload) => state.catsProducts = payload,
    SET_CONTACT_DATA: (state, payload) => state.contacts = payload,
}

export const actions = {
    async getSlides({commit}) {
        const data = await apiRequest.get(`slides`);
        commit('SET_WELCOME', data.data.products)
    },
    async getCategories({commit}) {
        const data = await apiRequest.get(`cats`);
        commit('SET_CATS', data.data.cats)
    },
    async getBanners({commit}) {
        const data = await apiRequest.get(`banners`)
        commit('SET_BANNERS', data.data.banners)
    },
    async getVideos({commit}) {
        const data = await apiRequest.get(`videos`)
        commit('SET_VIDEOS', data.data.videos)
    },
    async getAbout({commit}) {
        const data = await apiRequest.get(`about`)
        commit('SET_ABOUT', data.data.data)
    },
    async getCertificates({commit}) {
        const data = await apiRequest.get(`certificates`)
        commit('SET_DOCS', data.data.data)
    },
    async getProductsSlides({commit},body) {
        const data = await apiRequest.get(`products?type=${body.type}&lang=${body.lang}`)
        if (body.type == 'top_rated')
            commit('SET_PRODUCTS_SLIDER_TOP', data.data.data);
        else if (body.type == 'best_sellers')
            commit('SET_PRODUCTS_SLIDER_BEST', data.data.data);
        else if (body.type == 'editor_choice')
            commit('SET_PRODUCTS_SLIDER_EDITOR', data.data.data);
    },
    async getProduct({commit},link) {
        const data = await apiRequest.get(`product/${link}`)
        commit('SET_PRODUCT', data.data.news)
    },
    async getCatsProducts({commit},id) {
        const data = await apiRequest.get(`products?cat=${id}&lang=en`)
        commit('SET_CATS_PRODUCT', data.data.data)
    },
    async getContacts({commit}) {
        const data = await apiRequest.get(`contact`)
        commit('SET_CONTACT_DATA', data.data.data)
    },
    async stayConnected({commit}, data) {
        const data2 = await apiRequest.post(`subsctibe`,data)

        console.log(data2);
    },
    async addToCart({commit}, data) {
        const data2 = await apiRequest.post(`subsctibe`,data)
        console.log(data2);
    },
    async buyNow({commit}, data) {
        const data2 = await apiRequest.post(`order`,data)
    }
}
