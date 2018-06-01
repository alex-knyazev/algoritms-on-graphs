import findAdjacencyList from '@/utils/findAdjacencyList';

const findSpanningTrees = (adjacencyMatrix, connectedComponents) => {
  const result = {};
  for (let i = 0; i < connectedComponents.length; i++) {
    const component = connectedComponents[i];
    if (component.length > 1) {
      const relations = findRelations(adjacencyMatrix, component);
      const adjacencyList = findAdjacencyList(adjacencyMatrix.length, relations);
      for (const key in adjacencyList) {
        if (adjacencyList[key].length === 0) {
          delete adjacencyList[key];
        }
      }

      const spanningTreeByDFS = {
        relations: findTreeByDFS(adjacencyList),
        tops: Object.keys(adjacencyList),
      };

      const spanningTreeByBFS = {
        relations: findTreeByBFS(adjacencyList),
        tops: Object.keys(adjacencyList),
      };

      result[i] = {
        spanningTreeByDFS,
        spanningTreeByBFS,
      };
    }
  }

  return result;
};

const findTreeByDFS = (adjacencyList) => {
  const listKeys = Object.keys(adjacencyList);
  const visited = {};
  const tree = [];
  for (let i = 0; i < listKeys.length; i++) {
    const vertex = listKeys[i];
    const startVertex = vertex;
    if (visited[vertex] === undefined) {
      dfs(startVertex, vertex, visited, adjacencyList, tree);
    }
  }

  return tree;
};

const dfs = (startVertex, vertex, visited, adjacencyList, tree) => {
  visited[vertex] = true;
  if (startVertex !== vertex) tree.push([startVertex, vertex]);
  const listKeys = Object.keys(adjacencyList);
  for (let i = 0; i < listKeys.length; i++) {
    if (
      visited[listKeys[i]] === undefined &&
      adjacencyList[vertex].indexOf(parseInt(listKeys[i], 10)) !== -1
    ) {
      startVertex = vertex;
      dfs(startVertex, listKeys[i], visited, adjacencyList, tree);
    }
  }
};

const findTreeByBFS = (adjacencyList) => {
  const listKeys = Object.keys(adjacencyList);
  const queue = [];
  const visited = {};
  const tree = [];

  // помещаем в очередь первый узел
  queue.push(listKeys[0]);
  // пока в очереди что-то есть
  while (queue.length > 0) {
    const vertex = queue.shift();
    visited[vertex] = true;
    for (let i = 0; i < adjacencyList[vertex].length; i++) {
      const currentVertex = adjacencyList[vertex][i];
      if (visited[currentVertex] === undefined && queue.indexOf(currentVertex) === -1) {
        if (currentVertex !== vertex) {
          tree.push([parseInt(vertex, 10), parseInt(currentVertex, 10)]);
        }
        queue.push(currentVertex);
      }
    }
  }
  return tree;
};

const findRelations = (adjacencyMatrix, component) => {
  const relations = {};
  for (let i = 0; i < component.length; i++) {
    const rowInMatrix = adjacencyMatrix[component[i]];
    for (let j = 0; j < rowInMatrix.length; j++) {
      if (rowInMatrix[j] > 0) {
        if (component[i] + 1 > j + 1) {
          relations[`${j}, ${component[i]}`] = [component[i], j];
        } else {
          relations[`${component[i]}, ${j}`] = [component[i], j];
        }
      }
    }
  }
  return Object.values(relations);
};

export default findSpanningTrees;
