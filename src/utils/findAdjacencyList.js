const findAdjacencyList = (topsAmount, relations) => {
  const adjacencyList = {};
  for (let i = 0; i < topsAmount; i++) {
    adjacencyList[i] = [];
  }

  for (let i = 0; i < relations.length; i++) {
    const relation = relations[i];
    const firstTop = relation[0];
    const secondTop = relation[1];
    if (adjacencyList[firstTop]) {
      if (adjacencyList[firstTop].indexOf(secondTop === -1)) {
        adjacencyList[firstTop].push(secondTop);
      }
    } else {
      adjacencyList[firstTop] = [secondTop];
    }

    if (firstTop !== secondTop && adjacencyList[secondTop]) {
      if (adjacencyList[secondTop].indexOf(firstTop === -1)) {
        adjacencyList[secondTop].push(firstTop);
      }
    } else {
      adjacencyList[secondTop] = [firstTop];
    }
  }
  return adjacencyList;
};

export default findAdjacencyList;
