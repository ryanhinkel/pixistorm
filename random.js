export const randint = (l, h) => {
  return Math.floor(Math.random() * (h - l)) + l
}

export const choice = (arr) => {
  return arr[randint(0, arr.length)]
}

