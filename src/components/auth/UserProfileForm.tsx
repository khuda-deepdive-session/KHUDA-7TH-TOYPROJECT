// src/components/auth/UserProfileForm.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { ProfileUpdateData } from '@/types/auth';

interface UserProfileFormProps {
 onSubmit: (data: ProfileUpdateData) => Promise<void>;
 initialData?: Partial<{
   displayName: string;
   gender: 'male' | 'female';
   age: number;
 }>;
}

const Form = styled.form`
  max-width: 480px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
`;

const Title = styled.h2`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  color: ${theme.colors.mono.black};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.mono.darkGray};
`;

const Input = styled.input`
  width: 100%;
  height: 52px;
  padding: 0 ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  border: 2px solid ${theme.colors.mono.lightGray};
  font-size: ${theme.typography.fontSize.lg};
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${theme.colors.primary.main}20;
  }

  &::placeholder {
    color: ${theme.colors.mono.gray};
  }
`;

const RadioGroupContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xs};
`;

const RadioCard = styled.label<{ $isSelected: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  background-color: ${props => 
    props.$isSelected ? theme.colors.primary.main + '10' : theme.colors.background.secondary};
  border: 2px solid ${props => 
    props.$isSelected ? theme.colors.primary.main : theme.colors.mono.lightGray};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary.main};
  }
`;

const RadioInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const RadioText = styled.span<{ $isSelected: boolean }>`
  color: ${props => 
    props.$isSelected ? theme.colors.primary.main : theme.colors.mono.darkGray};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${props => 
    props.$isSelected ? theme.typography.fontWeight.medium : theme.typography.fontWeight.normal};
`;

const AgeInput = styled(Input)`
  width: 120px;
`;

const AgeInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const AgeUnit = styled.span`
  color: ${theme.colors.mono.darkGray};
  font-size: ${theme.typography.fontSize.lg};
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  margin-top: ${theme.spacing.xl};
  background-color: ${theme.colors.primary.main};
  color: ${theme.colors.mono.white};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.fast};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.primary.hover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
export const UserProfileForm: React.FC<UserProfileFormProps> = ({
  onSubmit,
  initialData = {},
 }) => {
  const [formData, setFormData] = useState({
    displayName: initialData.displayName || '',
    gender: initialData.gender || 'male',
    age: initialData.age?.toString() || '',
  });
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.displayName || !formData.age) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit({
        display_name: formData.displayName, // ProfileUpdateData 타입에 맞게 키 이름 변경
        gender: formData.gender as 'male' | 'female',
        age: Number(formData.age),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '프로필 업데이트에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const isFormValid = formData.displayName && formData.age && 
    Number(formData.age) > 0 && Number(formData.age) < 120;
 
  return (
    <Form onSubmit={handleSubmit}>
      <Title>프로필 설정</Title>
 
      {error && (
        <div className="text-red-500 text-sm mb-4 text-center">
          {error}
        </div>
      )}
 
      <FormGroup>
        <Label htmlFor="displayName">닉네임</Label>
        <Input
          id="displayName"
          type="text"
          value={formData.displayName}
          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
          placeholder="닉네임을 입력하세요"
          required
          disabled={isSubmitting}
        />
      </FormGroup>
 
      <FormGroup>
        <Label>성별</Label>
        <RadioGroupContainer>
          <RadioCard $isSelected={formData.gender === 'male'}>
            <RadioInput
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
              disabled={isSubmitting}
            />
            <RadioText $isSelected={formData.gender === 'male'}>남성</RadioText>
          </RadioCard>
          <RadioCard $isSelected={formData.gender === 'female'}>
            <RadioInput
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
              disabled={isSubmitting}
            />
            <RadioText $isSelected={formData.gender === 'female'}>여성</RadioText>
          </RadioCard>
        </RadioGroupContainer>
      </FormGroup>
 
      <FormGroup>
        <Label htmlFor="age">나이</Label>
        <AgeInputGroup>
          <AgeInput
            id="age"
            type="number"
            min="1"
            max="120"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="나이"
            required
            disabled={isSubmitting}
          />
          <AgeUnit>세</AgeUnit>
        </AgeInputGroup>
      </FormGroup>
 
      <SubmitButton 
        type="submit" 
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? '처리 중...' : '시작하기'}
      </SubmitButton>
    </Form>
  );
 };