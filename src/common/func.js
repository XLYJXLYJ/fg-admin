import axios from 'axios'

export default {
  ajaxGet (api, cb) {
    let loginToken = localStorage.getItem('loginToken')
    axios.get(api, {
      headers: {'token': loginToken}
    })
    .then(cb)
    .catch(err => {
      console.log(err)
    })
  },
  ajaxPost (api, cb) {
    let loginToken = localStorage.getItem('loginToken')
    axios.post(api, {
      headers: {'token': loginToken}
    })
    .then(cb)
    .catch(err => {
      console.log(err)
    })
  }
}
