import findAdjacencyList from '@/utils/findAdjacencyList';

const findAdditionalGraphRelations = (nodesAmount, relations) => {
  const resultRelations = [];
  const adjacencyList = findAdjacencyList(nodesAmount, relations);
  const listKeys = Object.keys(adjacencyList);
  for (let i = 0; i < listKeys.length; i++) {
    const node = parseInt(listKeys[i], 10);
    for (let j = i + 1; j < listKeys.length; j++) {
      const checkingNode = parseInt(listKeys[j], 10);
      if (adjacencyList[node].indexOf(checkingNode) === -1) {
        resultRelations.push([node, checkingNode]);
      }
    }
  }
  return resultRelations;
};

export default findAdditionalGraphRelations;
