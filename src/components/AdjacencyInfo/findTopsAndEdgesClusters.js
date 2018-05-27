const findTopsAndEdgesClusters = (relations, topsDegrees, adjacencyList) => {
  // изолированные вершины - те, которые не связаны с другими
  const isolatedTops = Object.keys(topsDegrees).filter(key => topsDegrees[key] === 0);

  // висячие вершины - те, у которых только одна связь
  const hangingTops = Object.keys(topsDegrees).filter(key => topsDegrees[key] === 1);

  // петли - ребра, инцидентные одной вершине
  const loops = relations.filter(relation => relation[0] === relation[1]);

  // петли с кратностями - если две петли 14-14, то кратность = 2
  const loopsWithMultiplicity = loops.reduce((previousValue, currentValue) => {
    const loopKey = `${currentValue[0]} - ${currentValue[0]}`;
    if (previousValue[loopKey]) {
      previousValue[loopKey] += 1;
    } else {
      previousValue[loopKey] = 1;
    }
    return previousValue;
  }, {});

  const relationsWithSortedElements = relations.map(relation => relation.sort((a, b) => a - b));
  // все кратные ребра.
  const edgesWithMultiplicity = relationsWithSortedElements.reduce(
    (previousValue, currentValue) => {
      const edgeKey = `${currentValue[0]} - ${currentValue[1]}`;
      if (previousValue[edgeKey]) {
        previousValue[edgeKey] += 1;
      } else {
        previousValue[edgeKey] = 1;
      }
      return previousValue;
    },
    {},
  );

  return {
    isolatedTops,
    hangingTops,
    loopsInfo: loopsWithMultiplicity,
    edgesInfo: edgesWithMultiplicity,
  };
};

export default findTopsAndEdgesClusters;
