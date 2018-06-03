import vis from 'vis';

const makeTree = (relations, treeContainer, nodes) => {
  const visNodes = new vis.DataSet(nodes);
  const visEdges = new vis.DataSet(relations.map(el => ({
    from: el[0],
    to: el[1],
  })));

  const data = {
    nodes: visNodes,
    edges: visEdges,
  };

  const options = {
    height: '500px',
    width: '100%',
    nodes: {
      color: 'green',
      font: {
        color: 'white',
        size: 20, // px
      },
    },
    edges: {
      color: {
        color: 'black',
      },
    },
    layout: {
      hierarchical: {
        direction: 'UD',
      },
    },
  };

  new vis.Network(treeContainer, data, options);
};

export default makeTree;
