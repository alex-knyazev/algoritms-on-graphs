import vis from 'vis';

const makeGraph = (relations, graphContainer, nodes, customOptions) => {
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
    height: '590px',
    width: '100%',
    nodes: {
      color: 'rgb(255,73,69)',
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
    interaction: {
      zoomView: false,
    },
    clickToUse: true,
    ...customOptions,
  };

  new vis.Network(graphContainer, data, options);
};

export default makeGraph;
