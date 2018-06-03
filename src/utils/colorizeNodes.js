import findNodesDegrees from '@/utils/findNodesDegrees';
import findAdjacencyList from '@/utils/findAdjacencyList';

const colorizeNodes = (graphNodes, nodesAmount, relations) => {
  let newGraphNodes = [...graphNodes];
  const nodesDegrees = findNodesDegrees(nodesAmount, relations);
  const adjacencyList = findAdjacencyList(nodesAmount, relations);
  let color = 1;
  const nodesSortedByDegree = Object.keys(nodesDegrees)
    .sort((a, b) => nodesDegrees[b] - nodesDegrees[a])
    .map(node => parseInt(node, 10));

  let colorCounter = 0;
  // пока есть неокрашенные узлы
  while (newGraphNodes.some(node => node.color === undefined)) {
    const currentNode = newGraphNodes.find(node => nodesSortedByDegree[colorCounter] === node.id);
    currentNode.color = color;
    // находим все вершины текущего цвета
    const currentColorNodes = newGraphNodes.filter(node => node.color === color);

    // ищем список вершин, не смежных с вершинами текущего цвета
    const notConnectedWithCurrentColorNodes = nodesSortedByDegree.filter((node) => {
      for (let i = 0; i < currentColorNodes.length; i++) {
        if (
          adjacencyList[currentColorNodes[i].id].indexOf(node) === -1 &&
          currentColorNodes[i].id !== node
        ) {
          return true;
        }
      }
      return false;
    });
    // окрашиваем неокрашенные несмежные вершины с вершинами текущего цвета в текущий цвет
    newGraphNodes = newGraphNodes.map((node) => {
      if (notConnectedWithCurrentColorNodes.indexOf(node.id) !== -1) {
        if (node.color === undefined) {
          node.color = color;
        }
      }
      return node;
    });
    color++;
    colorCounter++;
  }

  return newGraphNodes;
};

export default colorizeNodes;
