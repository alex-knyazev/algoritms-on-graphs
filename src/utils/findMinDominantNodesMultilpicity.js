// поиск наименьшего доминантного множества вершин графа
const findMinDominantNodesMultilpicity = (nodesDegrees, adjacencyList) => {
  const copyNodesDegrees = { ...nodesDegrees };
  const res = [];
  const used = [];
  while (Object.keys(copyNodesDegrees).length > 0) {
    let nodeWithMaxDegree;
    let maxDegree;
    for (const node in copyNodesDegrees) {
      const degree = copyNodesDegrees[node];
      if (degree === 0) {
        nodeWithMaxDegree = parseInt(node, 10);
        maxDegree = degree;
      }

      if (nodeWithMaxDegree === undefined || degree > maxDegree) {
        nodeWithMaxDegree = parseInt(node, 10);
        maxDegree = degree;
      }
    }

    res.push(nodeWithMaxDegree);
    delete copyNodesDegrees[nodeWithMaxDegree];
    for (let i = 0; i < adjacencyList[nodeWithMaxDegree].length; i++) {
      debugger;
      const connectedNode = adjacencyList[nodeWithMaxDegree][i];
      used.push(connectedNode);
      delete copyNodesDegrees[connectedNode];
    }
  }

  return res;
};

export default findMinDominantNodesMultilpicity;
