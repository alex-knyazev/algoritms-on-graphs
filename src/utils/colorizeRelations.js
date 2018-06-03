import findNodesDegrees from '@/utils/findNodesDegrees';

const colorizeRelations = (graphNodes, nodesAmount, relations) => {
  const newGraphRelations = relations.map(r => r);

  const nodesDegrees = findNodesDegrees(nodesAmount, relations);
  let color = 1;
  const relationsSortedByDegree = newGraphRelations.sort((a, b) => nodesDegrees[a[0]] + nodesDegrees[a[1]] - nodesDegrees[b[0] + nodesDegrees[b[1]]]);

  // пока есть неокрашенные ребра (если все окрашены - длина каждого массива = 3)
  while (relationsSortedByDegree.some(relation => relation.length !== 3)) {
    // находим первую в списке неокрашенную вершину
    const firstNotColored = relationsSortedByDegree.find(rel => rel.length === 2);
    firstNotColored[2] = color;

    // находим все рера текущего цвета, сохраняя индекс отношения в массиве
    const currentColorRelations = relationsSortedByDegree
      .map((relation, index) => ({ index, relation }))
      .filter(relationInfo => relationInfo.relation[2] === color);

    // ищем список ребер, не смежных с ребрами текущего цвета
    const notConnectedWithCurrentColorRelations = relationsSortedByDegree
      .map((relation, index) => ({ index, relation }))
      .filter((relationInfo) => {
        for (let i = 0; i < currentColorRelations.length; i++) {
          for (let j = 0; j < 2; j++) {
            if (
              relationInfo.relation.length === 3 ||
              relationInfo.relation.indexOf(currentColorRelations[i].relation[j]) !== -1
            ) {
              return false;
            }
          }
        }
        currentColorRelations.push(relationInfo);
        return true;
      });

    // окрашиваем неокрашенные несмежные ребра с вершинами текущего цвета в текущий цвет
    for (let i = 0; i < notConnectedWithCurrentColorRelations.length; i++) {
      const indexInRelationArray = notConnectedWithCurrentColorRelations[i].index;
      relationsSortedByDegree[indexInRelationArray][2] = color;
    }

    color++;
  }

  return newGraphRelations;
};

export default colorizeRelations;
