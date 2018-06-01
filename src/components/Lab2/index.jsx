import React, { Component } from 'react';

import makeGraph from '@/utils/makeGraph';
import findAdjacencyList from '@/utils/findAdjacencyList';
import checkIfTwoParts from '@/utils/checkIfTwoParts';
import findMaxIndependentMultiplicity from '@/utils/findMaxIndependentMultiplicity';
import findMinNodesCovering from '@/utils/findMinNodesCovering';
import findNodesDegrees from '@/utils/findNodesDegrees';
import findAdditionalGraphRelations from '@/utils/findAdditionalGraphRelations';
import findMaxPairsConnecting from '@/utils/findMaxPairsConnecting';
import findMinEdgesCovering from '@/utils/findMinEdgesCovering';
import findMinDominantNodesMultilpicity from '@/utils/findMinDominantNodesMultilpicity';
import findMinDominantEdgesMultilpicity from '@/utils/findMinDominantEdgesMultilpicity';

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

class Lab2 extends Component {
  constructor(props) {
    super(props);
    this.graphContainerRef = React.createRef();
    this.edgesGraphContainerRef = React.createRef();
    this.additionalGraphContainerRef = React.createRef();
    this.state = {
      relations: RELATIONS.map(relation => [relation[0] - 1, relation[1] - 1]),
    };
  }

  componentDidMount = () => {
    this.makeGraphs();
  };

  componentDidUpdate = () => {
    this.makeGraphs();
  };

  makeGraphs = () => {
    const { relations } = this.state;
    const graphNodes = [];
    const nodesAmount = NODES_AMOUNT;
    for (let x = 0; x < nodesAmount; x += 1) {
      graphNodes.push({ id: x, label: `Узел ${x}` });
    }
    const graphContainer = this.graphContainerRef.current;
    makeGraph(relations, graphContainer, graphNodes);

    const edgesGraphNodes = relations.map((rel) => {
      return {
        id: `${rel[0]}-${rel[1]}`,
        label: `Узел ${rel[0]}-${rel[1]}`,
      };
    });

    const edgesRelations = [];
    for (let i = 0; i < edgesGraphNodes.length; i++) {
      const [node1, node2] = edgesGraphNodes[i].id.split('-');
      for (let j = i + 1; j < edgesGraphNodes.length; j++) {
        const [comparedNode1, comparedNode2] = edgesGraphNodes[j].id.split('-');
        if (
          node1 === comparedNode1 ||
          node2 === comparedNode2 ||
          node1 === comparedNode2 ||
          node2 === comparedNode1
        ) {
          edgesRelations.push([`${edgesGraphNodes[i].id}`, `${edgesGraphNodes[j].id}`]);
        }
      }
    }
    const options = {
      height: '390px',
      nodes: {
        color: 'green',
        font: {
          color: 'white',
          size: 14, // px
        },
      },
    };

    const edgesGraphContainer = this.edgesGraphContainerRef.current;
    makeGraph(edgesRelations, edgesGraphContainer, edgesGraphNodes, options);

    const additionalGraphContainer = this.additionalGraphContainerRef.current;
    const additionalGraphNodes = graphNodes;
    const additionalGraphRelations = findAdditionalGraphRelations(nodesAmount, relations);

    makeGraph(additionalGraphRelations, additionalGraphContainer, additionalGraphNodes, options);
  };

  render() {
    const { relations } = this.state;
    const adjacencyList = findAdjacencyList(NODES_AMOUNT, relations);
    const nodesDegrees = findNodesDegrees(NODES_AMOUNT, relations);

    const isTwoParts = checkIfTwoParts(adjacencyList);

    const maxIndependentMultiplicity = findMaxIndependentMultiplicity(nodesDegrees, adjacencyList);
    const minNodesCovering = findMinNodesCovering(nodesDegrees, adjacencyList);

    const maxPairsConnecting = findMaxPairsConnecting(nodesDegrees, adjacencyList, relations);
    const minEdgesCovering = findMinEdgesCovering(nodesDegrees, adjacencyList, relations);

    const minDominantNodesMultilpicity = findMinDominantNodesMultilpicity(nodesDegrees, adjacencyList);
    const minDominantEdgesMultilpicity = findMinDominantEdgesMultilpicity(nodesDegrees, adjacencyList, relations);

    return (
      <div className={styles.lab}>
        <div className={styles.graph}>
          <div className={styles.graphContainer} ref={this.graphContainerRef} />
        </div>
        <div className={styles.info}>
          <div className={styles.edgesGraph}>
            <p>
              <b>Реберный граф</b>
            </p>
            <div className={styles.edgesGraphContainer} ref={this.edgesGraphContainerRef} />
          </div>
          <div>
            <p>
              <b>Граф двудольный?</b> {isTwoParts ? 'да' : 'нет'}
            </p>
          </div>
          <div>
            <p>
              <b>Максимальное независимое множество:</b> {maxIndependentMultiplicity.join(', ')}
            </p>
          </div>
          <div>
            <p>
              <b>Наименьшее вершинное покрытие:</b> {minNodesCovering.join(', ')}
            </p>
          </div>
          <div>
            <p>
              <b>Граф, дополнительный заданному:</b>
              <div
                className={styles.additionalGraphContainer}
                ref={this.additionalGraphContainerRef}
              />
            </p>
          </div>
          <div>
            <p>
              <b>Максимальное паросочетание:</b> {maxPairsConnecting.join('; ')}
            </p>
            <p>
              <b>Наименьшее реберное покрытие</b> {minEdgesCovering.join('; ')}
            </p>
          </div>
          <div>
            <p>
              <b>Наименьшее доминирующее множество вершин:</b>{' '}
              {minDominantNodesMultilpicity.join('; ')}
            </p>
            <p>
              <b>Наименьшее доминирующее множество ребер: </b>{' '}
              {minDominantEdgesMultilpicity.join('; ')}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Lab2;
