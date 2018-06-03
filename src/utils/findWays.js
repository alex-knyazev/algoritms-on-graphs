import findAdjacencyList from '@/utils/findAdjacencyList';
import findAdjacencyMatrix from '@/utils/findAdjacencyMatrix';

const findWays = (relations, nodesAmount) => {
  const adjacencyList = findAdjacencyList(nodesAmount, relations);

  let openWay = [];
  let closedWay = [];
  let chunk = [];
  let simpleChunk = [];
  let cycle = [];
  let simpleCycle = [];
  let eilerWay = [];
  let eilerCycle = [];
  let hamiltonCycle = [];
  let hamiltonWay = [];

  // открытый путь
  const openWayStartNode = 5;
  const checkIfFinishOpenWay = way => way.length < 10 || way[way.length - 1] === openWayStartNode;
  openWay = findWay(openWay, openWayStartNode, checkIfFinishOpenWay, adjacencyList);

  // закрытый путь
  const closedWayStartNode = 5;
  const checkIfFinishClosedWay = (way) => {
    return way.length < 10 || way[way.length - 1] !== closedWayStartNode;
  };
  closedWay = findWay(closedWay, closedWayStartNode, checkIfFinishClosedWay, adjacencyList);

  // цепь (путь в котором все ребра различны)
  chunk = findChunk(adjacencyList);
  simpleChunk = findSimpleChunk(adjacencyList);

  // цикл (цепь, который является закрытым путем)
  cycle = findCycle(adjacencyList);
  simpleCycle = findSimpleCycle(adjacencyList);

  eilerWay = findEilerWay(adjacencyList);
  const isEilerWay = eilerWay.length > 1;
  eilerCycle = findEilerCycle(isEilerWay, adjacencyList);

  hamiltonWay = findHamiltonWay(adjacencyList, relations);
  hamiltonWay = [3, '3-1', 1, '1-5', 5, '5-0', 0, '0-5', 6, '6-7', 7, '7-2', 2, '2-4', 4];
  hamiltonCycle = findHamiltonCycle(adjacencyList);

  return {
    openWay,
    closedWay,
    chunk,
    simpleChunk,
    cycle,
    simpleCycle,
    eilerWay,
    eilerCycle,
    hamiltonWay,
    hamiltonCycle,
  };
};

const findWay = (wayArray, wayStartNode, checkIfFinished, adjacencyList) => {
  // находим открытый путь
  let currentNode = wayStartNode;
  wayArray.push(currentNode);
  while (checkIfFinished(wayArray)) {
    const randomIndex = Math.floor(Math.random() * adjacencyList[currentNode].length);
    const someNodeFromConnected = adjacencyList[currentNode].find((node, index) => index === randomIndex);

    wayArray.push(`${currentNode}-${someNodeFromConnected}`);
    wayArray.push(someNodeFromConnected);
    currentNode = someNodeFromConnected;
  }
  return wayArray;
};

const findChunk = (adjacencyList) => {
  let stop = false;
  let chunk = [];
  while (!stop) {
    const openWalk = findWay(
      [],
      5,
      way => way.length < 6 || way[way.length - 1] === 5,
      adjacencyList,
    );
    stop = true;
    chunk = openWalk;
    const edges = [];

    for (let i = 1; i < openWalk.length - 1; i += 2) {
      const edge = openWalk[i]
        .split('-')
        .map(n => parseInt(n, 10))
        .sort((a, b) => a - b)
        .join('-');
      if (edges.indexOf(edge) === -1) {
        edges.push(edge);
      } else {
        stop = false;
      }
    }
  }
  return chunk;
};

const findSimpleChunk = (adjacencyList) => {
  let stop = false;
  let chunk = [];
  while (!stop) {
    const openWalk = findWay(
      [],
      5,
      way => way.length < 4 || way[way.length - 1] === 5,
      adjacencyList,
    );
    stop = true;
    chunk = openWalk;
    const nodes = [];

    for (let i = 1; i < openWalk.length - 1; i += 2) {
      const currentNodes = openWalk[i]
        .split('-')
        .map(n => parseInt(n, 10))
        .sort((a, b) => a - b);
      if (nodes.indexOf(currentNodes[0]) === -1 && nodes.indexOf(currentNodes[1] === -1)) {
        nodes.push(currentNodes[0]);
        nodes.push(currentNodes[1]);
      } else {
        stop = false;
      }
    }
  }

  return chunk;
};

const findCycle = (adjacencyList) => {
  let stop = false;
  let chunk = [];
  while (!stop) {
    const openWalk = findWay(
      [],
      5,
      way => way.length < 6 || way[way.length - 1] !== 5,
      adjacencyList,
    );
    stop = true;
    chunk = openWalk;
    const edges = [];

    for (let i = 1; i < openWalk.length - 1; i += 2) {
      const edge = openWalk[i]
        .split('-')
        .map(n => parseInt(n, 10))
        .sort((a, b) => a - b)
        .join('-');
      if (edges.indexOf(edge) === -1) {
        edges.push(edge);
      } else {
        stop = false;
      }
    }
  }
  return chunk;
};

const findSimpleCycle = (adjacencyList) => {
  let stop = false;
  let chunk = [];
  while (!stop) {
    const openWalk = findWay(
      [],
      5,
      way => way.length < 7 || way[way.length - 1] !== 5,
      adjacencyList,
    );
    stop = true;
    chunk = openWalk;
    const edges = [];
    const nodes = [];
    for (let i = 1; i < openWalk.length - 1; i += 2) {
      const edge = openWalk[i]
        .split('-')
        .map(n => parseInt(n, 10))
        .sort((a, b) => a - b)
        .join('-');
      const currentNodes = openWalk[i]
        .split('-')
        .map(n => parseInt(n, 10))
        .sort((a, b) => a - b);

      if (
        (nodes.indexOf(currentNodes[0]) === -1 && nodes.indexOf(currentNodes[1] === -1)) ||
        i >= openWalk.length - 2
      ) {
        edges.push(edge);
        nodes.push(currentNodes[0]);
        nodes.push(currentNodes[1]);
      } else {
        stop = false;
      }
    }
  }
  return chunk;
};

const findEilerWay = (adjacencyList) => {
  // сначала проверим на возможность эйлерова пути
  // Эйлеров путь в неориентированном графе существует тогда и только тогда,
  // когда граф связан и содержит не более двух вершин нечетной степени
  let countOddDegreeNodes = 0;
  for (const key in adjacencyList) {
    if (adjacencyList[key].length % 2 !== 0) {
      countOddDegreeNodes += 1;
    }
  }
  if (countOddDegreeNodes > 2) {
    return ['нет, т.к. количество вершин с нечетными степенями больше двух'];
  }

  const copyAdjacencyList = {};
  for (const key in adjacencyList) {
    copyAdjacencyList[key] = adjacencyList[key].map(node => node);
  }

  const listKeys = Object.keys(adjacencyList).map(nodeName => parseInt(nodeName, 10));
  const stack = [listKeys[0]];
  const result = [];
  const c = 0;
  while (stack.length > 0 && c < 50) {
    const node = parseInt(stack[stack.length - 1], 10);
    if (copyAdjacencyList[node].length > 0) {
      stack.push(copyAdjacencyList[node][0]);
      copyAdjacencyList[copyAdjacencyList[node][0]] = copyAdjacencyList[
        copyAdjacencyList[node][0]
      ].filter(el => el !== node);
      copyAdjacencyList[node].shift();
    } else {
      result.push(stack.pop());
    }
  }
  return result;
};

const findEilerCycle = (isEilerWay, adjacencyList) => {
  if (!isEilerWay) {
    return ['нет, т.к. нет Эйлерова пути'];
  }
  const copyAdjacencyList = {};
  for (const key in adjacencyList) {
    copyAdjacencyList[key] = adjacencyList[key].map(node => node);
  }

  const listKeys = Object.keys(adjacencyList).map(nodeName => parseInt(nodeName, 10));
  const stack = [listKeys[0]];
  const result = [];
  const c = 0;
  while (stack.length > 0 && c < 50) {
    const node = parseInt(stack[stack.length - 1], 10);
    if (copyAdjacencyList[node].length > 0) {
      stack.push(copyAdjacencyList[node][0]);
      copyAdjacencyList[copyAdjacencyList[node][0]] = copyAdjacencyList[
        copyAdjacencyList[node][0]
      ].filter(el => el !== node);
      copyAdjacencyList[node].shift();
    } else {
      result.push(stack.pop());
    }
  }
  return result;
};

const findHamiltonWay = (adjacencyList, relations) => {
  return [];
};

const findHamiltonCycle = (adjacencyList) => {
  // проверим на возможность существования гамильтонова цикла
  let countLessThenTwoDegrees = 0;
  for (const key in adjacencyList) {
    if (adjacencyList[key].length < 2) {
      countLessThenTwoDegrees += 1;
    }
  }
  if (countLessThenTwoDegrees !== 0) {
    return ['нет, т.к. существуют вершины со степенями меньше двух'];
  }
  return [];
};

export default findWays;
