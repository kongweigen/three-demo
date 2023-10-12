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

const coordinateList = [
  { x: 250, y: 250 },
  { x: 250, y: -250 },
  { x: -250, y: 250 },
  { x: -250, y: -250 },
]

export { generateQuadrantCollection, coordinateList }