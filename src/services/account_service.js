import axios from 'axios';
import store from '../store';


export default {
  async login(email, password) {
    let response = await axios.post("users/sign_in", { user: { email: email, password: password } })
    return response.data;
  },

  async signUp(name, email, password, passwordConfirmation) {
    let response = await axios.post("users", { user: { name: name, email: email, password: password,
                                                       password_confirmation: passwordConfirmation } })
    return response;
  },
  async update(id, name, city, description) {
    let headers = store.getters['accountHeaders'];
    headers['Content-Type'] = 'application/json';
    let response = await axios.patch(`users/${id}`, { user: { name: name, city: city, description: description } }, { headers: headers })
    return response.data;
  }
}
