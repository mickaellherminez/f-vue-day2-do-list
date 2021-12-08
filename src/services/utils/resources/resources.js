import Vue from "vue";

export default class Resources {
  getGender(params) {
    console.log('params', params)
    const url = `https://api.genderize.io/?name=${params}`;
    return Vue.axios.get(url);
  }
  getCharacters() {
    const url = `http://82.165.96.74:1337/characters`;
    return Vue.axios.get(url);
  }
}
