import router from '../../router'
import adminApi from '../../api/adminApi'
import Toast from '../../views/Toast'

const state = {
  userDetails: null,
  isLoggedIn: false,
};

const getters = {
  getLoginStatus: function (state) {
    if (state.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  },

  getUserDetails: function (state) {
    return state.userDetails;
  },

};

const mutations = {
  setUserDetails(state, val) {
    state.isLoggedIn = true;
    state.userDetails = val;
  },

  setLogout(state, val) {
    state.isLoggedIn = val;
    state.userDetails = null;
    if (!(router.history.current.path === '/')) {
      router.push('/').catch(() => { });
    }
  },

};

const actions = {

  async loginAdmin({ commit,/*  dispatch */ }, req) {
    await adminApi.login(req).then(response => {
      if ((response.status === 201 || response.status === 200) && response.data) {
        if(response.data.admin === true){
        commit("setUserDetails", response.data);
        router.push('/orders');
        }else{
          Toast.showToast("User Is Invalid", "E");
        }
      }
    }).catch(err => {
      if (err.response && err.response.status === 401) {
        Toast.showToast("Username or password is wrong", "E");
      }
      //dispatch("handleException", err.response, { root: true });
    });
  }


};



export default {
  state,
  getters,
  mutations,
  actions
};