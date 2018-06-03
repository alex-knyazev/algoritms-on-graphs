const findAdjacencyMatrix = (topsAmount, relations) => {
  const matrix = Array.from(Array(topsAmount), () => Array.from(Array(topsAmount), () => 0));
  for (let i = 0; i < relations.length; i++) {
    const relation = relations[i];
    const firstTop = relation[0];
    const secondTop = relation[1];

    matrix[firstTop][secondTop] += 1;
    if (firstTop !== secondTop) {
      matrix[secondTop][firstTop] += 1;
    }
  }
  return matrix;
};

export default findAdjacencyMatrix;
