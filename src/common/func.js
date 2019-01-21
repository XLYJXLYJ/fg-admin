import axios from 'axios'
import router from '@/router'

export default {
  ajaxGet (api, cb) {
    // let loginToken = localStorage.getItem('loginToken')
    let loginToken = this.get('loginToken',1000*60*60)
    axios.get(api, {
      headers: {'token': loginToken}
    })
    .then(cb)
    .catch(err => {
      console.log(err)
    })
  },
  ajaxPost (api, cb) {
    // let loginToken = localStorage.getItem('loginToken')
    let loginToken = this.get('loginToken',1000*60*60)
    axios.post(api, {
      headers: {'token': loginToken}
    })
    .then(cb)
    .catch(err => {
      console.log(err)
    })
  },
  set(key,value){
    let curTime = new Date().getTime();
    localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
    },
  get(key,exp){
    let data = localStorage.getItem(key);
    let dataObj = JSON.parse(data);
    if (new Date().getTime() - dataObj.time>exp) {
        alert('信息已过期,请重新登录');
        window.document.location.href = 'https://itoc.fgoushop.com/#/Login'
    }else{
      let dataObjDatatoJson = dataObj.data
      return dataObjDatatoJson;
    }
  }
}
