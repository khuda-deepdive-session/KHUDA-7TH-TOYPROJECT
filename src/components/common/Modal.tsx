// components/common/Modal.tsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  showCloseButton?: boolean;
}

interface StyledOverlayProps {
  $isOpen: boolean;
}

interface StyledModalContainerProps {
  $width?: string;
}

const Overlay = styled.div<StyledOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all ${theme.transitions.normal};
`;

const ModalContainer = styled.div<StyledModalContainerProps>`
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  width: ${props => props.$width || '480px'};
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  transform: scale(1);
  transition: transform ${theme.transitions.normal};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.mono.black};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.sm};
  color: ${theme.colors.mono.gray};
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.mono.black};
  }
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width,
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <ModalContainer
        $width={width}
        onClick={e => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <ModalHeader>
            {title && <Title>{title}</Title>}
            {showCloseButton && (
              <CloseButton onClick={onClose}>
                ✕
              </CloseButton>
            )}
          </ModalHeader>
        )}
        {children}
      </ModalContainer>
    </Overlay>
  );
};