const findAdjacencyMatrix = (topsAmount, tops) => {
  const matrix = Array.from(Array(topsAmount), () => Array.from(Array(topsAmount), () => 0));
  for (let i = 0; i < tops.length; i++) {
    const relation = tops[i];
    const firstTop = relation[0];
    const secondTop = relation[1];
    matrix[firstTop - 1][secondTop - 1] += 1;
    if (firstTop !== secondTop) {
      matrix[secondTop - 1][firstTop - 1] += 1;
    }
  }
  return matrix;
};

export default findAdjacencyMatrix;
