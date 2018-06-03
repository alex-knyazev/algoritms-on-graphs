const findKruskalTreeRelations = (nodesAmount, relations) => {
  const resultRelations = [];

  // сортируем ребра по взрастанию весов
  const relationsSortedByWeight = relations.map(rel => [...rel]).sort((a, b) => a[2] - b[2]);

  // помещаем каждый узел в отдельное дерево
  const nodes = [];
  for (let i = 0; i < nodesAmount; i++) {
    nodes[i] = {
      id: i,
      treeId: i,
    };
  }

  // для каждого сортированного ребра
  for (let j = 0; j < relationsSortedByWeight.length; j++) {
    const relation = relationsSortedByWeight[j];
    const [relNode1, relNode2, weight] = relation;

    const node1 = nodes.find(node => node.id === relNode1);
    const node2 = nodes.find(node => node.id === relNode2);

    // если входящие в ребро узлы принадлежать разным деревьям
    if (node1.treeId !== node2.treeId) {
      // заносим ребро в остовное дерево
      resultRelations.push([node1.id, node2.id, weight]);

      // каждый узел, индекс которого такой же как у индекса слитого дерева тоже сливаем
      for (let k = 0; k < nodes.length; k++) {
        if (nodes[k].treeId == node2.treeId) {
          nodes[k].treeId = node1.treeId;
        }
      }
    }
  }

  return resultRelations;
};

export default findKruskalTreeRelations;
