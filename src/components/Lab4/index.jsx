import React, { Component } from 'react';

import makeTree from '@/utils/makeTree';
import makeGraph from '@/utils/makeGraph';
import findAdjacencyList from '@/utils/findAdjacencyList';
import findYarnikTreeRelations from '@/utils/findYarnikTreeRelations';
import findKruskalTreeRelations from '@/utils/findKruskalTreeRelations';
import findBoruvkaTreeRelations from '@/utils/findBoruvkaTreeRelations';

import styles from './index.module.scss';

const RELATIONS = [
  [1, 2, 10],
  [1, 5, 23],
  [1, 6, 3],
  [2, 3, 12],
  [2, 4, 7],
  [2, 6, 6],
  [2, 8, 18],
  [3, 7, 23],
  [3, 8, 11],
  [5, 6, 20],
  [5, 8, 7],
  [7, 8, 9],
];

const NODES_AMOUNT = 8;

class Lab4 extends Component {
  constructor(props) {
    super(props);
    this.graphRef = React.createRef();
    this.yarnikTreeRef = React.createRef();
    this.kruskalTreeRef = React.createRef();
    this.boruvkaTreeRef = React.createRef();
    this.state = {
      relations: RELATIONS.map(relation => [relation[0] - 1, relation[1] - 1, relation[2]]),
      yarnikWeight: 0,
      kruskalWeight: 0,
      boruvkaWeight: 0,
    };
  }

  componentDidMount = () => {
    this.makeGraphs();
  };

  makeGraphs = () => {
    const { relations } = this.state;
    const graphNodes = [];

    const nodesAmount = NODES_AMOUNT;
    for (let x = 0; x < nodesAmount; x += 1) {
      graphNodes.push({ id: x, label: `Узел ${x}` });
    }

    // исходный граф
    const graphRelations = relations.map(rel => rel.slice(0, 2));
    const graphContainer = this.graphRef.current;
    makeGraph(graphRelations, graphContainer, graphNodes);

    // остов по Ярнику
    const yarnikTreeRelations = findYarnikTreeRelations(nodesAmount, relations);
    const yarnikTreeContainer = this.yarnikTreeRef.current;
    makeTree(yarnikTreeRelations, yarnikTreeContainer, graphNodes);
    const yarnikWeight = yarnikTreeRelations.reduce((prev, cur) => prev + parseInt(cur[2], 10), 0);

    // остов по Крускалу
    const kruskalTreeRelations = findKruskalTreeRelations(nodesAmount, relations);
    const kruskalTreeContainer = this.kruskalTreeRef.current;
    makeTree(kruskalTreeRelations, kruskalTreeContainer, graphNodes);
    const kruskalWeight = kruskalTreeRelations.reduce(
      (prev, cur) => prev + parseInt(cur[2], 10),
      0,
    );

    // остов по Борувке
    const boruvkaTreeRelations = findBoruvkaTreeRelations(nodesAmount, relations);
    const boruvkaTreeContainer = this.boruvkaTreeRef.current;
    makeTree(boruvkaTreeRelations, boruvkaTreeContainer, graphNodes);
    const boruvkaWeight = boruvkaTreeRelations.reduce(
      (prev, cur) => prev + parseInt(cur[2], 10),
      0,
    );
    this.setState({
      yarnikWeight,
      kruskalWeight,
      boruvkaWeight,
    });
  };

  render() {
    const {
      relations, yarnikWeight, kruskalWeight, boruvkaWeight,
    } = this.state;
    const adjacencyList = findAdjacencyList(NODES_AMOUNT, relations);

    return (
      <div className={styles.lab}>
        <div>
          <h2>Исходный граф</h2>
          <div ref={this.graphRef} />
        </div>
        <div className={styles.info}>
          <div>
            <h2>Остовное дерево по Ярнику</h2>
            <p>Сумма весов: {yarnikWeight}</p>
            <div ref={this.yarnikTreeRef} />
          </div>
          <div>
            <h2>Остовное дерево по Крускалу</h2>
            <p>Сумма весов: {kruskalWeight}</p>
            <div ref={this.kruskalTreeRef} />
          </div>
          <div>
            <h2>Остовное дерево по Борувке</h2>
            <p>Сумма весов: {boruvkaWeight}</p>
            <div ref={this.boruvkaTreeRef} />
          </div>
        </div>
      </div>
    );
  }
}

export default Lab4;
