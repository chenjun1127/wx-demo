export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

export const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const getParms = (scene: string) => {
  var arrPara = scene.split("&");
  var params = {} as any;
  for (let param of arrPara) {
    var arr = param.split("=");
    params[arr[0]] = arr[1];
  }
  return params;
}
