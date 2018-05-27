import React, { Component } from 'react';
import vis from 'vis';

import AdjacencyInfo from '@/components/AdjacencyInfo';

import makeGraphSimple from './makeGraphSimple';

import styles from './index.module.scss';

const RELATIONS = [
  [1, 6],
  [12, 5],
  [2, 1],
  [5, 3],
  [1, 2],
  [6, 2],
  [15, 2],
  [9, 1],
  [2, 3],
  [14, 14],
  [12, 9],
  [14, 1],
  [8, 10],
  [12, 12],
  [5, 2],
  [2, 15],
  [3, 7],
  [14, 11],
  [4, 14],
  [3, 2],
];

const TOPS_AMOUNT = 15;

class Lab1 extends Component {
  constructor(props) {
    super(props);
    this.graphContainerRef = React.createRef();
    this.state = {
      relations: RELATIONS,
    };
  }

  componentDidMount = () => {
    this.makeGraph();
  };

  makeGraph = () => {
    const { relations } = this.state;
    const graphContainer = this.graphContainerRef.current;

    const nodes = [];
    for (let i = 1; i <= TOPS_AMOUNT; i += 1) {
      nodes.push({ id: i, label: `Node ${i}` });
    }

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
      height: '100%',
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
    };

    new vis.Network(graphContainer, data, options);
  };

  handleToSimpleClick = () => {
    const { relations } = this.state;

    // здесь мы типа сдалаем граф простым
    makeGraphSimple(relations);
  };

  render() {
    const { relations } = this.state;

    return (
      <div className={styles.lab}>
        <div className={styles.menu}>
          <button onClick={this.handleToSimpleClick}>К простому</button>
        </div>
        <div className={styles.graphContainer} ref={this.graphContainerRef} />

        <div className={styles.info}>
          <AdjacencyInfo topsAmount={TOPS_AMOUNT} relations={relations} />
        </div>
      </div>
    );
  }
}

export default Lab1;
