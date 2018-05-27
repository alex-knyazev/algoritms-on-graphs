import React from 'react';
import cn from 'classnames';

import findAdjacencyList from './findAdjacencyList';
import findAdjacencyMatrix from './findAdjacencyMatrix';
import findTopsDegrees from './findTopsDegrees';
import findTopsAndEdgesClusters from './findTopsAndEdgesClusters';

import styles from './index.module.scss';

export default (props) => {
  const { topsAmount, relations } = props;

  const adjacencyList = findAdjacencyList(topsAmount, relations);
  const adjacencyMatrix = findAdjacencyMatrix(topsAmount, relations);
  const topsDegrees = findTopsDegrees(topsAmount, relations);

  const {
    isolatedTops, hangingTops, loopsInfo, edgesInfo,
  } = findTopsAndEdgesClusters(
    relations,
    topsDegrees,
    adjacencyList,
  );

  const adjacencyListTable = makeAdjacencyListTable(adjacencyList);
  const adjacencyMatrixTable = makeAdjacencyMatrixTable(adjacencyMatrix);
  const topsDegreesTable = makeTopsDegrees(topsDegrees);
  return (
    <div className={styles.adjacencyInfo}>
      <p>Количество вершин: {topsAmount}</p>

      <p>Список смежности: </p>
      {adjacencyListTable}

      <p>Матрица смежности: </p>
      {adjacencyMatrixTable}

      <p>Степени вершин: </p>
      {topsDegreesTable}

      <p>Список изолированных вершин: {isolatedTops.join(', ')}</p>

      <p>Список &quot;висячих&quot; вершин: {hangingTops.join(', ')}</p>

      <p>Список &quot;висячих&quot; вершин: {hangingTops.join(', ')}</p>

      <p>Петли:</p>
      <ul>
        {Object.keys(loopsInfo).map(key => (
          <li>
            {key}: кратность {loopsInfo[key]}
          </li>
        ))}
      </ul>

      <p>Кратные ребра:</p>
      <ul>
        {Object.keys(edgesInfo).map(key => (
          <li>
            {key}: кратность {edgesInfo[key]}
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
      {Array.from(Array(matrix.length), (el, index) => <td> {index + 1}</td>)}
    </tr>,
  ];

  for (let i = 0; i < matrix.length; i++) {
    const cells = [<td>{i + 1}</td>];
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
