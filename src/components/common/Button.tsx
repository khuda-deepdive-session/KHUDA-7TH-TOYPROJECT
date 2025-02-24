// components/common/Button.tsx
import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary.main};
        color: ${theme.colors.mono.white};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary.hover};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${theme.colors.mono.white};
        color: ${theme.colors.primary.main};
        border: 1px solid ${theme.colors.primary.main};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.background.secondary};
        }
      `;
    case 'tertiary':
      return css`
        background-color: transparent;
        color: ${theme.colors.primary.main};
        &:hover:not(:disabled) {
          background-color: ${theme.colors.background.secondary};
        }
      `;
    case 'danger':
      return css`
        background-color: ${theme.colors.status.error};
        color: ${theme.colors.mono.white};
        &:hover:not(:disabled) {
          opacity: 0.9;
        }
      `;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return css`
        height: 32px;
        padding: 0 ${theme.spacing.md};
        font-size: ${theme.typography.fontSize.sm};
      `;
    case 'md':
      return css`
        height: 40px;
        padding: 0 ${theme.spacing.lg};
        font-size: ${theme.typography.fontSize.base};
      `;
    case 'lg':
      return css`
        height: 48px;
        padding: 0 ${theme.spacing.xl};
        font-size: ${theme.typography.fontSize.lg};
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  ${props => getVariantStyles(props.variant || 'primary')}
  ${props => getSizeStyles(props.size || 'md')}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    margin-right: ${theme.spacing.xs};
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: ${theme.colors.mono.white};
  animation: spin 1s ease-in-out infinite;
  margin-right: ${theme.spacing.sm};

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  disabled,
  ...props 
}) => {
  return (
    <StyledButton disabled={disabled || isLoading} {...props}>
      {isLoading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
};