import vis from 'vis';

const makeGraph = (relations, graphContainer, nodes, customOptions) => {
  const visNodes = new vis.DataSet(nodes);

  // relations - массив массивов, в кажом - два или три элемента (третий - цвет, необязательный)
  const visEdges = new vis.DataSet(relations.map(el => ({
    from: el[0],
    to: el[1],
    color: {
      color: el[2] ? el[2] : 'black',
    },
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
    interaction: {
      zoomView: false,
    },
    clickToUse: true,
    ...customOptions,
  };

  new vis.Network(graphContainer, data, options);
};

export default makeGraph;
