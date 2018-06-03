import React, { Component } from 'react';

import makeGraph from '@/utils/makeGraph';
import colorizeNodes from '@/utils/colorizeNodes';
import colorizeRelations from '@/utils/colorizeRelations';
import findWays from '@/utils/findWays';
import findAdjacencyMatrix from '@/utils/findAdjacencyMatrix';
import findConnectedComponents from '@/utils/findConnectedComponents';
import findSpanningTreeRelationsByBFS from '@/utils/findSpanningTreeRelationsByBFS';

import styles from './index.module.scss';

const RELATIONS = [
  [1, 5],
  [1, 6],
  [1, 7],
  [2, 4],
  [2, 6],
  [3, 5],
  [3, 6],
  [3, 7],
  [3, 8],
  [5, 6],
  [6, 7],
  [7, 8],
];

const NODES_AMOUNT = 8;

const COLORS = {
  1: 'red',
  2: 'green',
  3: 'blue',
  4: 'black',
  5: 'orange',
  6: 'violet',
};

class Lab3 extends Component {
  constructor(props) {
    super(props);
    this.graphContainerRef = React.createRef();
    this.spanningTreeContainerRef = React.createRef();
    this.state = {
      relations: RELATIONS.map(relation => [relation[0] - 1, relation[1] - 1]),
      chromaticNumber: 0,
      chromaticIndex: 0,
    };
  }

  componentDidMount = () => {
    this.makeGraphs();
  };

  makeGraphs = () => {
    const { relations } = this.state;
    let graphNodes = [];
    const nodesAmount = NODES_AMOUNT;
    for (let x = 0; x < nodesAmount; x += 1) {
      graphNodes.push({ id: x, label: `Узел ${x}` });
    }
    // раскрасим каждый узел графа
    graphNodes = colorizeNodes(graphNodes, nodesAmount, relations);
    // находим хроматическое число
    const chromaticNumber = graphNodes.sort((a, b) => b.color - a.color)[0].color;
    // сопоставляем число цвета с конкретным цветом
    graphNodes = graphNodes.map(node => ({ ...node, color: COLORS[node.color] }));
    // добавляем третий элемент (цвет) в каждый элемент из relations
    let colorizedRelations = [...relations];
    colorizedRelations = colorizeRelations(graphNodes, nodesAmount, colorizedRelations);
    // находим хроматический индекс
    const chromaticIndex = colorizedRelations.sort((a, b) => b[2] - a[2])[0][2];

    // сопоставляем число цвета с конкретным цветом ребра
    colorizedRelations = colorizedRelations.map((rel) => {
      rel[2] = COLORS[rel[2]];
      return rel;
    });

    const graphContainer = this.graphContainerRef.current;
    this.setState({
      chromaticNumber,
      chromaticIndex,
    });

    makeGraph(colorizedRelations, graphContainer, graphNodes);

    const spanningTreeRelations = findSpanningTreeRelationsByBFS(nodesAmount, relations);
    const spanningTreeContainer = this.spanningTreeContainerRef.current;
    makeGraph(spanningTreeRelations, spanningTreeContainer, graphNodes);
  };

  render() {
    const nodesAmount = NODES_AMOUNT;
    const { relations } = this.state;
    const { chromaticNumber, chromaticIndex } = this.state;
    const adjacencyMatrix = findAdjacencyMatrix(nodesAmount, relations);
    const connectedComponents = findConnectedComponents(adjacencyMatrix);
    const maxConnectedComponent = connectedComponents.sort((a, b) => b.length - a.length)[0];

    const {
      openWay,
      closedWay,
      eilerWay,
      eilerCycle,
      hamiltonWay,
      hamiltonCycle,
      chunk,
      simpleChunk,
      cycle,
      simpleCycle,
    } = findWays(relations, nodesAmount);

    return (
      <div className={styles.lab}>
        <div className={styles.graph}>
          <div className={styles.graphContainer} ref={this.graphContainerRef} />
        </div>
        <div className={styles.info}>
          <div>
            <p>
              <b>Хроматическое число: </b>
              {chromaticNumber}
            </p>
            <p>
              <b>Хроматический индекс: </b>
              {chromaticIndex}
            </p>
          </div>
          <div>
            <p>
              <b>Пример открытого пути: </b>
              {openWay.join('; ')}
            </p>
            <p>
              <b>Пример закрытого пути: </b>
              {closedWay.join('; ')}
            </p>
            <p>
              <b>Пример цепи: </b>
              {chunk.join('; ')}
            </p>
            <p>
              <b>Пример простой цепи: </b>
              {simpleChunk.join('; ')}
            </p>
            <p>
              <b>Пример цикла: </b>
              {cycle.join('; ')}
            </p>
            <p>
              <b>Пример простого цикла: </b>
              {simpleCycle.join('; ')}
            </p>
            <p>
              <b>Пример Эйлерова пути: </b>
              {eilerWay.join('; ')}
            </p>
            <p>
              <b>Пример Эйлерова цикла: </b>
              {eilerCycle.join('; ')}
            </p>
            <p>
              <b>Пример Гамильтонова пути: </b>
              {hamiltonWay.join('; ')}
            </p>
            <p>
              <b>Пример Гамильтонова цикла: </b>
              {hamiltonCycle.join('; ')}
            </p>
          </div>
          <div>
            <p>
              <b>Максимальная компонента связности: </b>
              {maxConnectedComponent.join(', ')}
              <p>Обхват: 2, Диаметр: 5, Окружение: 6</p>
            </p>
          </div>
          <div>
            <p>
              <b>Остовное дерево: </b>
            </p>
          </div>
          <div>
            <div className={styles.spanningTreeContainer} ref={this.spanningTreeContainerRef} />
          </div>
        </div>
      </div>
    );
  }
}

export default Lab3;
