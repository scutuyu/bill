import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'
const server = axios.create({
  headers: {
    // 'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true
})

server.interceptors.request.use(function(config) {
  return config
}, function(error) {
  alert('请求失败')
  return Promise.reject(error)
})

server.interceptors.response.use(function(response) {
  return response
}, function(error) {
  return Promise.reject(error)
})

const api = 'http://localhost:8082/bill'
const home = 'home'
const statistics = 'statistics'
const common = 'common'

class Api {
  addBill(params) {
    return server.post(`${api}/${home}/bill`, params)
  }

  updateBill(params) {
    return server.update(`${api}/${home}/bill`, params)
  }

  deleteBill(id) {
    return server.delete(`${api}/${home}/bill/${id}`)
  }

  getBill(id) {
    return server.get(`${api}/${home}/bill/${id}`)
  }

  listBills(params) {
    // return server.get(`${api}/${home}/bills?start_date=2019-01-01 00:00:00&end_date=2019-01-13 00:00:00`, params)
    return server.get(`${api}/${home}/bills?`, {
      params
    })
  }

  groupByDate(params) {
    return server.get(`${api}/${statistics}/group_by_date`, {
      params
    })
  }

  groupByBillName(params) {
    return server.get(`${api}/${statistics}/group_by_bill_name`, {
      params
    })
  }

  groupByBillType(params) {
    return server.get(`${api}/${statistics}/group_by_bill_type`, {
      params
    })
  }

  groupByBillPayStyle(params) {
    return server.get(`${api}/${statistics}/group_by_pay_style`, {
      params
    })
  }

  getPayStyles() {
    return server.get(`${api}/${common}/pay_styles`)
  }

  getBillTypes() {
    return server.get(`${api}/${common}/bill_types`)
  }

  getBillNames() {
    return server.get(`${api}/${common}/bill_names`)
  }
}

const $http = new Api()

export default $http
