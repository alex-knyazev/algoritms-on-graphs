import React from 'react';

import makeTree from './makeTree';

import styles from './index.module.scss';

class Trees extends React.Component {
  constructor(props) {
    super(props);

    this.treeDFSContainer = React.createRef();
    this.treeBFSContainer = React.createRef();
  }

  componentDidMount = () => {
    const { trees } = this.props;
    const [spanningTreeByDFS, spanningTreeByBFS] = trees;

    const treeDFSContainer = this.treeDFSContainer.current;
    const treeBFSContainer = this.treeBFSContainer.current;

    makeTree(spanningTreeByDFS.relations, treeDFSContainer, spanningTreeByDFS.tops);
    makeTree(spanningTreeByBFS.relations, treeBFSContainer, spanningTreeByBFS.tops);
  };

  render() {
    return (
      <div className={styles.trees}>
        <div className={styles.treeDFS}>
          <h2>Дерево, полученное поиском в глубину</h2>
          <div ref={this.treeDFSContainer} />
        </div>
        <div className={styles.treeBFS}>
          <h2>Дерево, полученное поиском в ширину</h2>
          <div ref={this.treeBFSContainer} />
        </div>
      </div>
    );
  }
}

export default Trees;
