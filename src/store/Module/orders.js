import adminApi from '../../api/adminApi'
import Toast from '../../views/Toast';
const state = {
orders:null,
reportedorders:null
};

const getters = {
    getReportedOrders: function (state) {
        return state.reportedorders;
    },
};

const mutations = {
    setOrders: function (state, val){
        state.orders = val;
    },
    setReportedOrders: function (state, reportedorders){
        state.reportedorders = reportedorders;
    }
};

const actions = {

   async getAllOrders({commit,dispatch}){
       await adminApi.getAllOrders().then(response =>{
           if((response.status === 200 || response.status === 201) && response.data){
               commit('setOrders', JSON.stringify(response.data));
           }
       }).catch(err => {
        dispatch("handleException", err.response, { root: true });
       })
   },
   
   async getAllReportedOrders({commit,dispatch}){
       await adminApi.getAllReportedOrders().then(response =>{
           if((response.status === 200 || response.status === 201) && response.data){
               commit('setReportedOrders', JSON.stringify(response.data));
           }
       }).catch(err => {
        dispatch("handleException", err.response, { root: true });
       })
   },
   async settleOrder({/*  commit, */ dispatch }, req) {
    await adminApi.settleOrder(req).then(response => {
        if ((response.status === 201 || response.status === 200) && response.data) {
            dispatch('getAllReportedOrders');
            if(response.data.success=== true){
                Toast.showToast(response.data.message, "S");
            }else{
                Toast.showToast(response.data.message, "E");
            }
        }
    }).catch(err => {
        dispatch("handleException", err.response, { root: true });
    });
},
};

export default{
    state,
    getters,
    mutations,
    actions
}