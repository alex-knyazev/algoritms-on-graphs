import findAdjacencyList from '@/utils/findAdjacencyList';

const findYarnikTreeRelations = (nodesAmount, relations) => {
  const adjacencyList = findAdjacencyList(nodesAmount, relations);
  const lisKeys = Object.keys(adjacencyList).map(el => parseInt(el, 10));
  const adjacencyListWithWeights = addWeightsToAdjacencyList();

  const resultRelations = [];
  const usedNodes = [];
  const startNode = 0;
  // записываем первую ноду в остов
  usedNodes.push(startNode);
  // ищем смежную вершину с минимальным весом
  const connectedWithMinWeight = adjacencyListWithWeights[startNode].sort((a, b) => a.weight - b.weight)[0];

  resultRelations.push([startNode, connectedWithMinWeight.node, connectedWithMinWeight.weight]);

  usedNodes.push(connectedWithMinWeight.node);

  while (usedNodes.length < nodesAmount) {
    // ищем такие ребра, чтобы один конец был в одной из взятых в usedNodes вершин, а другой - в одной из невзятых
    // и берем из этих ребер ребро с минимальным весом
    const neededRelation = relations
      .filter((rel) => {
        const node1 = rel[0];
        const node2 = rel[1];
        if (
          (usedNodes.indexOf(node1) !== -1 && usedNodes.indexOf(node2) === -1) ||
          (usedNodes.indexOf(node1) === -1 && usedNodes.indexOf(node2) !== -1)
        ) {
          return true;
        }
        return false;
      })
      .sort((a, b) => a[2] - b[2])[0];

    const node1 = neededRelation[0];
    if (usedNodes.indexOf(node1) === -1) {
      usedNodes.push(node1);
    }
    const node2 = neededRelation[1];
    if (usedNodes.lastIndexOf(node2) === -1) {
      usedNodes.push(node2);
    }

    resultRelations.push(neededRelation);
  }

  return resultRelations;

  function addWeightsToAdjacencyList() {
    const result = {};
    for (let i = 0; i < lisKeys.length; i++) {
      result[lisKeys[i]] = [];
      for (let j = 0; j < adjacencyList[lisKeys[i]].length; j++) {
        const node = adjacencyList[lisKeys[i]][j];
        const weight = relations.find((rel) => {
          return (
            (rel[0] === lisKeys[i] && rel[1] === node) || (rel[1] === lisKeys[i] && rel[0] === node)
          );
        })[2];

        result[lisKeys[i]][j] = {
          node,
          weight,
        };
      }
    }
    return result;
  }
};

export default findYarnikTreeRelations;
