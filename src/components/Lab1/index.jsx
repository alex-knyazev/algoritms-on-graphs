import React, { Component } from 'react';

import AdjacencyInfo from '@/components/AdjacencyInfo';
import Modal from '@/components/Modal';
import Trees from '@/components/Trees';

import makeGraphSimple from '@/utils/makeGraphSimple';
import makeGraph from '@/utils/makeGraph';

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
      relations: RELATIONS.map(relation => [relation[0] - 1, relation[1] - 1]),
      showTrees: false,
      trees: [],
    };
  }

  componentDidMount = () => {
    const { relations } = this.state;
    const graphContainer = this.graphContainerRef.current;
    const topsAmount = TOPS_AMOUNT;
    const nodes = [];
    for (let i = 0; i < topsAmount; i += 1) {
      nodes.push({ id: i, label: `Узел ${i}` });
    }
    makeGraph(relations, graphContainer, nodes);
  };

  componentDidUpdate = () => {
    const { relations } = this.state;
    const graphContainer = this.graphContainerRef.current;
    const topsAmount = TOPS_AMOUNT;
    const nodes = [];
    for (let i = 0; i < topsAmount; i += 1) {
      nodes.push({ id: i, label: `Узел ${i}` });
    }
    makeGraph(relations, graphContainer, nodes);
  };

  onCloseModalClick = () => {
    this.setState({
      showTrees: false,
    });
  };

  handleToSimpleClick = () => {
    const { relations } = this.state;
    const simpleRelations = makeGraphSimple(relations);
    this.setState({
      relations: simpleRelations,
    });
  };

  showSpanningTree = (treeRelations) => {
    const { spanningTreeByDFS, spanningTreeByBFS } = treeRelations;
    this.setState({
      showTrees: true,
      trees: [spanningTreeByDFS, spanningTreeByBFS],
    });
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
          <AdjacencyInfo
            topsAmount={TOPS_AMOUNT}
            relations={relations}
            showSpanningTree={this.showSpanningTree}
          />
        </div>
        {this.state.showTrees && (
          <Modal onCloseClick={this.onCloseModalClick}>
            <Trees trees={this.state.trees} />
          </Modal>
        )}
      </div>
    );
  }
}

export default Lab1;
