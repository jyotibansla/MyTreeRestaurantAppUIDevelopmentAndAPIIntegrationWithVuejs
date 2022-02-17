import adminApi from '../../api/adminApi'
import Toast from '../../views/Toast' 
 const state = {
    // customercf :null,
    // chefcf:null,
    // defaultcgst:null,
    // defaultsgst :null,
    allGlobalParams:null
 };

 const getters = {
  
 };

 const mutations = {
    setAllGlobalParams: function (state, customercf) {
        state.customercf = customercf;
    },
 };

 const actions = {
    async getallGlobalParameters({ commit, dispatch }) {
        await adminApi
            .getAllGlobalParameter().then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    commit("setAllGlobalParams", JSON.stringify(response.data));
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
    },
  
    async editItemByName({ dispatch },req) {
        await adminApi
            .editGlobalParameter(req).then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                   if(response.data.success === true){
                       Toast.showToast(response.data.message, 'S');
                   }else{
                    Toast.showToast(response.data.message, 'E');
                   }
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
    },
 };


 export default {
     state,
     getters,
     mutations,
     actions
 }