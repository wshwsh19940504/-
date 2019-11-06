import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    token:'',
    //存储购物车商品的数组
    cartarry:JSON.parse(localStorage.getItem('cartarry'))||[]
  },
  mutations: {
    //设置vuex的token
    settoken(state,token){
      state.token=token
    },
    //添加商品到购物车,传tag进来，没有就添加新数组，有的话，在基础上加一
    tocart(state,tag){
      let goods=state.cartarry.find(v=>v.title==tag.label)
      if (goods) {
        goods.cartCount+=1
      }else{
        state.cartarry.push({title:tag.label,cartCount:1})
      }
    },

  //购物车加一
  cartadd(state,index){
    state.cartarry[index].cartCount++
  },
   //购物车商品数量减一
   removecart(state,index){
    if (state.cartarry[index].cartCount>1) {
      state.cartarry[index].cartCount--
    } else {
      if (window.confirm('确定从购物车删除商品吗')) {
        //splice()方法删除,从index位置开始，删除一个项目，包含index
        state.cartarry.splice(index,1)
      }
    }
   },
   //清空购物车
   clearcart(state){
     state.cartarry=[]
   }
  },
  actions: {

  },
  //相当于计算属性
  getters:{
      countsum(state){
        let num=0
        state.cartarry.forEach(v=>{
          num+=v.cartCount
        })
        return num
      }
  }
})

//每次调用mutation，都会进入这个方法，追踪mutations方法调用
store.subscribe((mutations,state)=>{
  //storage只能存储字符串，所以需要JSON.stringfy和JSON.parse()方法
    localStorage.setItem('cartarry',JSON.stringify(state.cartarry))
    
})

export default store