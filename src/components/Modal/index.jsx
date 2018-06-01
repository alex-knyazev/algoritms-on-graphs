import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const modalRoot = document.getElementById('modal-root');

/**
 * @class Modal - компонент абстракция над portal-api
 */
class Modal extends Component {
  constructor(props) {
    super(props);
    /**
     * Создает ноду которая будет помещена в контейнер модалки, т.к
     * каждая нода - независимый элемент, внутрь контейнера может быть помещено несколько подобных
     */
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    const { header, hideCloseIcon } = this.props;
    const content = (
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          {!hideCloseIcon && (
            <span
              role="button"
              tabIndex="0"
              title="Закрыть"
              onKeyDown={(e) => {
                if (e.keyCode === 32 || e.keyCode === 13) {
                  this.onCloseIconClick();
                }
              }}
              onClick={this.props.onCloseClick}
              className={styles.closeIcon}
            >
              ×
            </span>
          )}
          {header.length > 0 && <header className={styles.header}>{header}</header>}
          {this.props.children}
        </div>
      </div>
    );

    return createPortal(content, this.el);
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  hideCloseIcon: PropTypes.bool,
  header: PropTypes.string,
  onCloseClick: PropTypes.func,
};

Modal.defaultProps = {
  children: null || [],
  onCloseClick: () => {},
  hideCloseIcon: false,
  header: '',
};

export default Modal;
