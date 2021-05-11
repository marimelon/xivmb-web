export const separate = (num: number) =>
  String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
