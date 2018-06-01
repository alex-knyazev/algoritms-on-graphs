const findConnectedComponents = (adjacencyMatrix) => {
  const amountTops = adjacencyMatrix.length;
  const visited = Array.from(Array(amountTops), () => false);
  const result = [];
  for (let i = 0; i < amountTops; i++) {
    const vertex = i;
    if (visited[vertex] === false) {
      // обходим в глубину
      const newComponent = [];
      dfs(vertex, visited, adjacencyMatrix, newComponent);
      result.push(newComponent);
    }
  }

  return result;
};

const dfs = (vertex, visited, matrix, component) => {
  component.push(vertex);
  visited[vertex] = true;
  for (let i = 0; i < matrix.length; i++) {
    if (visited[i] === false && matrix[vertex][i] > 0) {
      dfs(i, visited, matrix, component);
    }
  }
};

export default findConnectedComponents;
