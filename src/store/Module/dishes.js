import adminApi from '../../api/adminApi'
import Toast from '../../views/Toast'

const state = {
   dishes: null,
   dishposting: null,

};

const getters = {
    getDishes: function (state) {
        return state.dishes;
    },
    getDishPosting: function (state) {
        return state.dishposting;
    },


};

const mutations = {
    setDishes: function (state, dishes) {
        state.dishes = dishes;
    },

    setDishPosting: function (state, dishposting) {
        state.dishposting = dishposting;
    }
};

const actions = {

    async getDish({ commit, dispatch }) {
        await adminApi
            .getAllDishes().then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    commit("setDishes", JSON.stringify(response.data));
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
    },

    async activateDishes({/*  commit, */ dispatch }, req) {
        await adminApi.activateDish(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getDish');
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
    async deactivateDishes({ /* commit, */ dispatch }, req) {
        await adminApi.deactivateDish(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getDish');
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



    async getDishPosting({ commit, dispatch }) {
        await adminApi
            .getAllDishPostings().then(response => {
                if ((response.status === 201 || response.status === 200) && response.data) {
                    commit("setDishPosting", JSON.stringify(response.data));
                }
            }).catch(err => {
                dispatch("handleException", err.response, { root: true });
            });
    },

    async activateDishPostings({/*  commit, */ dispatch }, req) {
        await adminApi.activateDishPosting(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getDishPosting');
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
    async deactivateDishPostings({ /* commit, */ dispatch }, req) {
        await adminApi.deactivateDishPosting(req).then(response => {
            if ((response.status === 201 || response.status === 200) && response.data) {
                dispatch('getDishPosting');
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







export default {
    state,
    getters,
    mutations,
    actions
  };
