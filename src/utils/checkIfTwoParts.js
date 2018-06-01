// проверяет, является ли граф двудольным с помощью поиска в ширину
const checkIfTwoParts = (adjacencyList) => {
  const listKeys = Object.keys(adjacencyList);
  const queue = [];
  const visited = {};
  const minNode = Math.min.apply(null, listKeys.map(key => parseInt(key, 10)));
  const maxNode = Math.max.apply(null, listKeys.map(key => parseInt(key, 10)));

  let isTwoParts = true;
  const part = Array.from(Array(Object.keys(adjacencyList).length), () => -1);

  for (let i = minNode; i < maxNode; i++) {
    if (part[i] === -1) {
      let h = minNode;
      let t = minNode;
      t += 1;
      queue[t] = i;
      part[i] = 0;
      while (h < t) {
        h += 1;
        const vertex = queue[h];
        for (let j = 0; j < adjacencyList[vertex].length; j++) {
          const to = adjacencyList[vertex][j];
          if (part[to] === -1) {
            part[to] = part[vertex] === -1 ? 0 : -1;
            t += 1;
            queue[t] = to;
          } else if (part[to] === part[vertex]) {
            isTwoParts = false;
          }
        }
      }
    }
  }

  return isTwoParts;
};

export default checkIfTwoParts;
