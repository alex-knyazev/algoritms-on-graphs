const findBoruvkaTreeRelations = (nodesAmount, relations) => {
  const resultRelations = [];

  // помещаем каждый узел в отдельное дерево
  const nodes = [];
  for (let i = 0; i < nodesAmount; i++) {
    nodes[i] = {
      id: i,
      treeId: i,
    };
  }
  let c = 0;
  // пока resultRelations - не дерево
  while (resultRelations.length < nodes.length - 1 && c < 50) {
    // находим фрагменты - узлы с одинаковыми treeId
    let fragments = findFragments(nodes);

    const minimalEdges = {};
    // для каждого фрагмента ищем минимальное по весу исходящее ребро
    for (let i = 0; i < fragments.length; i++) {
      const fragment = fragments[i];
      const fragmentNodes = fragment.map(n => n.id);
      // все исходящие из фрагмента ребра
      const outGoingEdges = findOutGoingFragments(fragmentNodes, relations);
      // исходящие ребра сортируются по весу, выбираем c самым меньшим весом
      const mostLowWeightEdge = outGoingEdges.sort((edge1, edge2) => edge1[2] - edge2[2])[0];
      resultRelations.push(mostLowWeightEdge);
      // объединяем фрагменты
      const [edgeNode1, edgeNode2] = mostLowWeightEdge;

      const node1 = nodes.find(node => node.id == edgeNode1);
      const node2 = nodes.find(node => node.id == edgeNode2);
      const node1Tree = node1.treeId;
      const node2Tree = node2.treeId;

      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].treeId === node2Tree) {
          nodes[j].treeId = node1Tree;
        }
      }
      fragments = findFragments(nodes);
      debugger;
    }
    c++;
  }
  debugger;
  return resultRelations;
};

function findFragments(nodes) {
  const fragments = {};
  for (let i = 0; i < nodes.length; i++) {
    if (fragments[nodes[i].treeId]) {
      continue;
    }
    const fragment = nodes.filter(node => node.treeId === nodes[i].treeId);
    fragments[nodes[i].treeId] = fragment;
  }
  return Object.values(fragments);
}

function findOutGoingFragments(fragmentNodes, relations) {
  return relations.filter((rel) => {
    const isOutgoingFirst = fragmentNodes.indexOf(rel[0]) !== -1;
    const isOutgoingSecond = fragmentNodes.indexOf(rel[1]) !== -1;
    return (isOutgoingFirst && !isOutgoingSecond) || (isOutgoingSecond && !isOutgoingFirst);
  });
}

export default findBoruvkaTreeRelations;
