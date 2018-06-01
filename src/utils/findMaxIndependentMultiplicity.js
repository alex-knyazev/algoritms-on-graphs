// поиск максимально независимого множества с помощью
// эвристически жадного алгоритма
export default function (nodesDegrees, adjacencyList) {
  const temp = { ...adjacencyList };
  const copyNodesDegrees = { ...nodesDegrees };
  const result = [];

  // пока есть ребра в графе
  while (Object.keys(copyNodesDegrees).length > 0) {
    // находим индекс вершины с минимальной степенью
    let nodeWithMinDegree;
    let minDegree;
    for (const node in copyNodesDegrees) {
      const degree = copyNodesDegrees[node];
      if (degree === 0) {
        nodeWithMinDegree = node;
        minDegree = degree;
        break;
      }

      if (nodeWithMinDegree === undefined || degree < minDegree) {
        nodeWithMinDegree = node;
        minDegree = degree;
      }
    }

    // записываем найденную вершину в результат
    result.push(nodeWithMinDegree);
    delete copyNodesDegrees[nodeWithMinDegree];

    // удаляем все ребра, инциндентные вершине
    for (const node in temp) {
      if (temp[node].indexOf(parseInt(nodeWithMinDegree, 10)) !== -1) {
        delete copyNodesDegrees[node];
        delete temp[node];
      }
    }
  }

  return result;
}
