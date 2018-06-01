import findMaxPairsConnecting from '@/utils/findMaxPairsConnecting';

// поиск наименьшего доминантного множества ребер графа
const findMinDominantEdgesMultilpicity = (nodesDegrees, adjacencyList, relations) => {
  // Любое максимальное паросочетание всегда является рёберным доминирующим множеством.
  return findMaxPairsConnecting(nodesDegrees, adjacencyList, relations);
};

export default findMinDominantEdgesMultilpicity;
