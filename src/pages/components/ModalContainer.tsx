import React from 'react';
import _merge from 'lodash/merge';
import styled from '@emotion/styled';
import { checkIsMobile } from '../../utils';
import ReactModal from 'react-modal';
import ActionSheet from './ActionSheet';

const DEFAULT_MODAL_WIDTH = 400;
const customStyles = (width: number | string) => {
  return {
    overlay: {
      zIndex: '10',
      backgroundColor: 'rgba(0, 0, 0, .7)',
    },
    content: {
      width: width === 'auto' ? width : width + 'px',
      height: 'auto',
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle',
      backgroundColor: '#fff',
      borderRadius: '2px',
    },
  };
};

const ModalContainer = ({ children, visible, onCancel }) => {
  const isMobile = checkIsMobile();

  if (isMobile) {
    return (
      <ActionSheet visible={visible} onCancel={onCancel}>
        {children}
      </ActionSheet>
    );
  }

  return (
    <StyledModal
      isOpen={visible}
      style={_merge(customStyles(DEFAULT_MODAL_WIDTH))}
      onRequestClose={onCancel}
      className={`styled-modal`}
      shouldCloseOnOverlayClick={true}
      appElement={typeof document !== 'undefined' && document.body}
      overlayClassName={`classic-modal-overlay`}>
      {children}
    </StyledModal>
  );
};

export default ModalContainer;

const StyledModal = styled(ReactModal)`
  min-height: 250px;
  padding: 30px 20px;
  background-color: #192a38 !important;
  border: none !important;
  border-radius: 16px !important;
  overflow: hidden;

  &:focus-visible {
    outline: none;
  }
`;
