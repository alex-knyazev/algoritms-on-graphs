import React from 'react';
import cn from 'classnames';

import findAdjacencyList from '@/utils/findAdjacencyList';
import findAdjacencyMatrix from '@/utils/findAdjacencyMatrix';
import findNodesDegrees from '@/utils/findNodesDegrees';
import findConnectedComponents from '@/utils/findConnectedComponents';
import findTopsAndEdgesClusters from './findTopsAndEdgesClusters';
import findSpanningTrees from './findSpanningTrees';

import styles from './index.module.scss';

export default (props) => {
  const { topsAmount, relations, showSpanningTree } = props;

  const adjacencyList = findAdjacencyList(topsAmount, relations);
  const adjacencyMatrix = findAdjacencyMatrix(topsAmount, relations);
  const topsDegrees = findNodesDegrees(topsAmount, relations);

  const {
    isolatedTops, hangingTops, loopsInfo, edgesInfo,
  } = findTopsAndEdgesClusters(
    relations,
    topsDegrees,
    adjacencyList,
  );

  const connectedComponents = findConnectedComponents(adjacencyMatrix);
  const spanningTreesOfComponents = findSpanningTrees(adjacencyMatrix, connectedComponents);

  const adjacencyListTable = makeAdjacencyListTable(adjacencyList);
  const adjacencyMatrixTable = makeAdjacencyMatrixTable(adjacencyMatrix);
  const topsDegreesTable = makeTopsDegrees(topsDegrees);

  return (
    <div className={styles.adjacencyInfo}>
      <p>
        <b>Количество вершин:</b> {topsAmount}
      </p>

      <p>
        <b>Cписок смежности:</b>{' '}
      </p>
      {adjacencyListTable}

      <p>
        <b>Матрица смежности:</b>{' '}
      </p>
      {adjacencyMatrixTable}

      <p>
        <b>Степени вершин:</b>{' '}
      </p>
      {topsDegreesTable}

      <p>
        <b>Список изолированных вершин:</b> {isolatedTops.join(', ')}
      </p>

      <p>
        <b>Список &quot;висячих&quot; вершин:</b> {hangingTops.join(', ')}
      </p>

      <p>
        <b>Петли:</b>
      </p>
      <ul>
        {Object.keys(loopsInfo).map(key => (
          <li>
            {key}: кратность {loopsInfo[key]}
          </li>
        ))}
      </ul>

      <p>
        <b>Кратные ребра:</b>
      </p>
      <ul>
        {Object.keys(edgesInfo).map(key => (
          <li>
            {key}: кратность {edgesInfo[key]}
          </li>
        ))}
      </ul>
      <p>
        <b>Компоненты связности:</b>
      </p>
      <ul>
        {connectedComponents.map((component, index) => (
          <li>
            {index}: {component.map(el => el).join(', ')}
            {component.length > 1 && (
              <button
                className={styles.spanningTreeButton}
                onClick={() => showSpanningTree(spanningTreesOfComponents[index])}
              >
                Ост. дерево
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const makeAdjacencyListTable = (adjacencyList) => {
  const elementsRows = Object.keys(adjacencyList).map((key) => {
    return (
      <tr>
        <td>{key} </td> <td> {adjacencyList[key].join(', ')} </td>
      </tr>
    );
  });

  return (
    <table className={styles.adjacencyList}>
      <tbody>{elementsRows}</tbody>
    </table>
  );
};

const makeAdjacencyMatrixTable = (matrix) => {
  const elementsRows = [
    <tr>
      <td>№</td>
      {Array.from(Array(matrix.length), (el, index) => <td> {index}</td>)}
    </tr>,
  ];

  for (let i = 0; i < matrix.length; i++) {
    const cells = [<td>{i}</td>];
    for (let j = 0; j < matrix[i].length; j++) {
      const cellClasses = cn({
        [styles.mainDiagonalCell]: i === j,
      });
      cells.push(<td className={cellClasses}>{matrix[i][j]}</td>);
    }
    elementsRows.push(<tr>{cells}</tr>);
  }

  return (
    <table className={styles.adjacencyMatrix}>
      <tbody>{elementsRows}</tbody>
    </table>
  );
};

const makeTopsDegrees = (topsDegrees) => {
  const elementsRows = Object.keys(topsDegrees).map((key) => {
    return (
      <tr>
        <td>{key} </td> <td> {topsDegrees[key]} </td>
      </tr>
    );
  });

  return (
    <table className={styles.topsDegrees}>
      <tbody>
        <tr>
          <td>Вершина</td>
          <td>Степень</td>
        </tr>
        {elementsRows}
      </tbody>
    </table>
  );
};
