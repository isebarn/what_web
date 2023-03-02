// middleware to route user to '/login' if the vuex state 'email' is not set
export default function ({ app, store, redirect }) {
    if (!store.state.email) {
        if (app.$cookies.get('email')) {
            store.commit('updateField', { path: 'email', value: app.$cookies.get('email') });
            return redirect('/');
        } 

        return redirect('/login');
    }
}