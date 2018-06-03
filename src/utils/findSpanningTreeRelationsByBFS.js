import findAdjacencyList from '@/utils/findAdjacencyList';

const findSpanningTreeRelationsByBFS = (nodesAmount, relations) => {
  const adjacencyList = findAdjacencyList(nodesAmount, relations);
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

export default findSpanningTreeRelationsByBFS;
