import React, { useContext } from 'react';
import { WindowWidthContext } from '../../context/windowWidthContext';
import PropTypes from 'prop-types'

export default function Container({ children }) {
  const { isSmallerDevice } = useContext(WindowWidthContext);
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: isSmallerDevice ? '95%' : '85%' }}>{children}</div>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
