import React, { memo } from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';
import _merge from 'lodash/merge';

// import Loading from 'components/common/Loading'

export default memo(
  ({
    visible = false,
    onCancel,
    className,
    children,
  }: {
    visible: boolean;
    onCancel: () => void;
    className?: string;
    children: JSX.Element;
  }) => {
    return (
      <>
        <StyledSheet visible={visible} className={`styled-modal ${className}`}>
          {children}
        </StyledSheet>
        {visible && <SheetMask onClick={onCancel} />}
      </>
    );
  }
);

const StyledSheet = styled.div<{ visible: boolean }>`
  width: 100%;
  height: auto;
  min-height: 300px;
  position: fixed;
  bottom: 0;
  background-color: #192a38 !important;
  border-radius: 24px 24px 0 0;
  left: 0;
  right: 0;
  transform: ${(props) => (props.visible ? 'translateY( 0)' : 'translateY( 100%)')};
  transition: all 0.5s;
  z-index: 9;
`;

const SheetMask = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;
