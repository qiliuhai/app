import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import GroupOrder from '@/pages/Center/GroupOrder'
import MyOrder from '@/pages/Center/MyOrder'

export default [
    {
        name: 'center',
        path: '/center',
        component: Center,
        meta: { isshow: true },
        redirect: '/center/myorder',
        children: [
            {
                name: 'grouporder',
                path: 'grouporder',
                component: GroupOrder
            },
            {
                name: 'myorder',
                path: 'myorder',
                component: MyOrder
            },
            //  {
            //     path: '/center',
            //     redirect: '/center/myorder'

            // }
        ]
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { isshow: true }
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: { isshow: true }
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { isshow: false }
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: { isshow: false }
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { isshow: true }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { isshow: true }
    },
    {
        name: 'addCartSuccess',
        path: '/addCartSuccess',
        component: AddCartSuccess,
        meta: { isshow: true }
    },
    {
        name: 'detail',
        path: '/detail/:skuId?',
        component: Detail,
        meta: { isshow: true }
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: { isshow: true }
    },
    {

        path: '*',
        redirect: '/home'
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: { isshow: true },
        // props: true
        // props: { keyword: 1, keys: 2 }
        props: ($route) => {
            return {
                keyword: $route.params.keyword,
                keys: $route.query.key
            }
        }
    }
]

