function generateQuadrantCollection(minx, maxx, miny, maxy) {
  const list = [];
  for (let x = minx; x <= maxx; x++) {
    for (let y = miny; y <= maxy; y++) {
      if (x != 0 && y != 0) {
        list.push({ x, y });
      }
      // if (x > 0 && y > 0) {
      //   list.push({ x, y });
      // } else if (x < 0 && y > 0) {
      //   list.push({ x, y });
      // } else if (x < 0 && y < 0) {
      //   list.push({ x, y });
      // } else if (x > 0 && y < 0) {
      //   list.push({ x, y });
      // }
    }
  }
  return list;
}

// const coordinateList = [
//   { x: 25, y: 25 },
//   { x: 25, y: -25 },
//   { x: -25, y: 25 },
//   { x: -25, y: -25 },
// ]
const coordinateList = [
  { x: 125, y: 0 },
  { x: -125, y: 0 },
]

export { generateQuadrantCollection, coordinateList }