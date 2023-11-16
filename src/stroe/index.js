import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import trade from './trade'
import users from './users'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        trade,
        users
    }

})
export default store