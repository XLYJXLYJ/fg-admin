import axios from 'axios'
export default {
  myGet (url, params) {
    let _url = url
    return new Promise((resolve, reject) => {
      axios.get(_url, {params}).then(function (response) {
        resolve(response.data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  },
  myPost (url, params) {
    let _url = url
    return new Promise((resolve, reject) => {
      axios.post(_url, {params}).then(function (response) {
        resolve(response.data)
      })
      .catch(function (err) {
        reject(err)
      })
    })
  }
}
