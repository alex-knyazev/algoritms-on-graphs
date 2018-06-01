// нахождение минимального реберного покрытия

const findMinEdgesCovering = (nodesDegrees, adjacencyList, relations) => {
  const copyNodesDegrees = { ...nodesDegrees };
  const copyRelations = [...relations];
  const isolated = [];
  const result = [];
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

    for (let i = 0; i < copyRelations.length; i++) {
      if (
        copyRelations[i].indexOf(nodeWithMaxDegree) !== -1 &&
        isolated.indexOf(nodeWithMaxDegree) === -1
      ) {
        result.push(copyRelations[i]);
        for (let j = 0; j < copyRelations[i].length; j++) {
          isolated.push(copyRelations[i][j]);
        }
        for (let z = 0; z < copyRelations.length; z++) {
          if (
            isolated.indexOf(copyRelations[z][0]) !== -1 &&
            isolated.indexOf(copyRelations[z][1]) !== -1
          ) {
            delete copyNodesDegrees[copyRelations[z][0]];
            delete copyNodesDegrees[copyRelations[z][1]];
            copyRelations.splice(z, 1);
            z--;
          }
        }
      }
    }
  }
  return result;
};

export default findMinEdgesCovering;
