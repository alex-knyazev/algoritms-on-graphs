// нахождение максимального паросочетания жадным алгоритмом

const findMaxPairsConnecting = (nodesDegrees, adjacencyList, relations) => {
  const copyNodesDegrees = { ...nodesDegrees };
  const copyRelations = [...relations];
  const isolated = [];
  const result = [];
  while (Object.keys(copyNodesDegrees).length > 0) {
    let nodeWithMinDegree;
    let minDegree;
    for (const node in copyNodesDegrees) {
      const degree = copyNodesDegrees[node];
      if (degree === 0) {
        nodeWithMinDegree = parseInt(node, 10);
        minDegree = degree;
      }

      if (nodeWithMinDegree === undefined || degree < minDegree) {
        nodeWithMinDegree = parseInt(node, 10);
        minDegree = degree;
      }
    }

    for (let i = 0; i < copyRelations.length; i++) {
      if (
        copyRelations[i].indexOf(nodeWithMinDegree) !== -1 &&
        isolated.indexOf(nodeWithMinDegree) === -1
      ) {
        result.push(copyRelations[i]);
        for (let j = 0; j < copyRelations[i].length; j++) {
          isolated.push(copyRelations[i][j]);
        }
        for (let z = 0; z < copyRelations.length; z++) {
          if (
            isolated.indexOf(copyRelations[z][0]) !== -1 ||
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

export default findMaxPairsConnecting;
