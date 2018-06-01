const findNodesDegrees = (nodesAmount, relations) => {
  const nodesDegrees = {};
  for (let i = 0; i < nodesAmount; i++) {
    nodesDegrees[i] = 0;
  }
  for (let i = 0; i < relations.length; i++) {
    const relation = relations[i];
    for (let j = 0; j < relation.length; j++) {
      nodesDegrees[relation[j]] += 1;
    }
  }
  return nodesDegrees;
};

export default findNodesDegrees;
