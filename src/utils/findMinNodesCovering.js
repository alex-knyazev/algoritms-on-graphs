// поиск минимального вершинного покрытия с помощью
// эвристически жадного алгоритма
export default function (nodesDegrees, adjacencyList) {
  const temp = { ...adjacencyList };
  const copyNodesDegrees = { ...nodesDegrees };
  const result = [];

  // пока есть ребра в графе
  while (Object.keys(copyNodesDegrees).length > 0) {
    // находим индекс вершины с максимальной степенью
    let nodeWithMaxDegree;
    let maxDegree;
    for (const node in copyNodesDegrees) {
      const degree = copyNodesDegrees[node];
      if (degree === 0) {
        nodeWithMaxDegree = node;
        maxDegree = degree;
        break;
      }

      if (nodeWithMaxDegree === undefined || degree > maxDegree) {
        nodeWithMaxDegree = node;
        maxDegree = degree;
      }
    }

    // записываем найденную вершину в результат
    result.push(nodeWithMaxDegree);
    delete copyNodesDegrees[nodeWithMaxDegree];

    // удаляем все ребра, инциндентные вершине
    for (const node in temp) {
      if (temp[node].indexOf(parseInt(nodeWithMaxDegree, 10)) !== -1) {
        delete copyNodesDegrees[node];
        delete temp[node];
      }
    }
  }

  return result;
}
