// function formatDate(timestamp) {
//     var d = new Date(timestamp);
//     var date = (d.getFullYear()) + "-" +
//             (d.getMonth() + 1) + "-" +
//             (d.getDate()) + " " +
//             (d.getHours()) + ":" +
//             (d.getMinutes()) + ":" +
//             (d.getSeconds());
//     return date;
// }

function formatDate(times, type) {
  // console.log(times);
  // let time = null
  // if(typeof(times)=='string'){
  //   time = new Date(JSON.parse(times))
  // }else time = new Date(times)
  const time = new Date(times)
  const year = time.getFullYear().toString()
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const day = time.getDate().toString().padStart(2, '0')
  const hour = time.getHours().toString().padStart(2, '0')
  const min = time.getMinutes().toString().padStart(2, '0')
  const sec = time.getSeconds().toString().padStart(2, '0')
  let week = ''
  switch (time.getDay()) {
    case 0:
      week = '日'
      break
    case 1:
      week = '一'
      break
    case 2:
      week = '二'
      break
    case 3:
      week = '三'
      break
    case 4:
      week = '四'
      break
    case 5:
      week = '五'
      break
    case 6:
      week = '六'
      break
  }
  switch (type) {
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`
    case 'yyyy年MM月dd日':
      return `${year}年${month}月${day}日`
    case 'week':
      return `${week}`
    default:
      return `${year}-${month}-${day} ${hour}:${min}:${sec}`
  }
}

export {
  formatDate
}
