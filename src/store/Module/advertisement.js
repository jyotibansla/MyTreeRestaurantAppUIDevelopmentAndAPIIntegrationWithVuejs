
const state = {
    advertisement:[]
};

const getters = { 
    getAdvertisement : (state) => {
        return state.advertisement;
    }
};

const mutations = {
    setAdvertisement(state, add){
        state.advertisement.push(add);
    }
};

const actions = {
        addNewAd({commit}, add){
            commit('setAdvertisement', add);
        }
};

export default{
    state,
    getters,
    mutations,
    actions
};