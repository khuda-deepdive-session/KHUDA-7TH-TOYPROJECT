// components/common/Input.tsx
import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const InputWrapper = styled.div<{ fullWidth?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const Label = styled.label`
  color: ${theme.colors.mono.darkGray};
  font-size: ${theme.typography.fontSize.sm};
  margin-bottom: ${theme.spacing.xs};
  font-weight: ${theme.typography.fontWeight.medium};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ hasError?: boolean; hasStartIcon?: boolean; hasEndIcon?: boolean }>`
  width: 100%;
  height: 48px;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${props => props.hasError ? theme.colors.status.error : theme.colors.mono.lightGray};
  font-size: ${theme.typography.fontSize.base};
  transition: all ${theme.transitions.fast};
  background-color: ${theme.colors.background.primary};
  
  ${props => props.hasStartIcon && css`
    padding-left: 40px;
  `}
  
  ${props => props.hasEndIcon && css`
    padding-right: 40px;
  `}

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? theme.colors.status.error : theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${props => props.hasError ? 
      `${theme.colors.status.error}20` : 
      `${theme.colors.primary.main}20`
    };
  }

  &:disabled {
    background-color: ${theme.colors.background.secondary};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${theme.colors.mono.gray};
  }
`;

const IconWrapper = styled.div<{ position: 'start' | 'end' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.position === 'start' ? 'left: 12px;' : 'right: 12px;'}
  display: flex;
  align-items: center;
  color: ${theme.colors.mono.gray};
`;

const HelperText = styled.span<{ isError?: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  color: ${props => props.isError ? theme.colors.status.error : theme.colors.mono.gray};
  margin-top: ${theme.spacing.xs};
`;

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <InputWrapper fullWidth={fullWidth}>
      {label && <Label>{label}</Label>}
      
      <InputContainer>
        {startIcon && <IconWrapper position="start">{startIcon}</IconWrapper>}
        
        <StyledInput
          hasError={!!error}
          hasStartIcon={!!startIcon}
          hasEndIcon={!!endIcon}
          {...props}
        />
        
        {endIcon && <IconWrapper position="end">{endIcon}</IconWrapper>}
      </InputContainer>

      {(error || helperText) && (
        <HelperText isError={!!error}>
          {error || helperText}
        </HelperText>
      )}
    </InputWrapper>
  );
};