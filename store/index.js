// imports for vuex-map-fields
import { getField, updateField } from 'vuex-map-fields';

// state for product and cart
export const state = {
    products: [],
    cart: [],
    email: null
};

// getters for product and cart
export const getters = {
    getField,

    cart(state) {
        return state.cart;
    }

};

// mutation to update cart
export const mutations = {
    updateField,
    setProducts(state, products) {
        state.products = products;
    },

    setCart(state, cart) {
        state.cart = cart;
    },

    // append item to cart
    appendItem(state, item) {
        state.cart.push(item);
    },

    // remove item from cart
    removeItemFromCart(state, item) {
        state.cart = state.cart.filter(cartItem => cartItem.id !== item.id);
    },

    // reset the state
    resetState(state) {
        state.cart = []
        state.email = null
    }
};

// actions for product and cart
export const actions = {
    // get products from api/products and commit to state
    async getProducts({ commit }) {
        const response = await this.$axios.get('product');
        commit('setProducts', response.data);
    },

    // get cart from api/cart?email=<some_email>
    async getCart({ commit, state }) {
        const response = await this.$axios.get(`cart?email=${state.email}&$include=item`);
        commit('setCart', response.data);
    },

    // add item to cart
    async addToCart({ commit, state }, item) {
        const response = await this.$axios.post('cart', { email: state.email, item: item });
        commit('appendItem', {...response.data, item: item});
    },

    // delete item from cart
    async removeItemFromCart({ commit }, item) {
        const response = await this.$axios.delete(`cart/${item.id}`);
        commit('removeItemFromCart', item);
    },

    // login with email, only stores the email and routes to '/'
    async login({ commit }, email) {
        commit('updateField', { path: 'email', value: email });
        this.$cookies.set('email', email)
        this.$router.push('/');
    },

    // logout, removes the email and routes to '/login'
    async logout({ commit }) {
        this.$cookies.remove('email');
        commit('resetState');
        this.$router.push('/login');        
    }
}
