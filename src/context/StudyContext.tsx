// src/context/StudyContext.tsx
import React, { createContext, useContext, useReducer, useCallback } from 'react';

interface StudyState {
  currentQuestion: Question | null;
  studyHistory: StudyHistoryItem[];
  isLoading: boolean;
  error: string | null;
}

interface Question {
  id: string;
  wrongSentence: string;
  rightSentence: string;
  explanation: string;
  category: string;
  difficulty: number;
}

interface StudyHistoryItem {
  questionId: string;
  isCorrect: boolean;
  timestamp: Date;
  timeSpent: number;
}

type StudyAction =
  | { type: 'SET_QUESTION'; payload: Question }
  | { type: 'ADD_HISTORY'; payload: StudyHistoryItem }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_HISTORY' };

const initialState: StudyState = {
  currentQuestion: null,
  studyHistory: [],
  isLoading: false,
  error: null,
};

const studyReducer = (state: StudyState, action: StudyAction): StudyState => {
  switch (action.type) {
    case 'SET_QUESTION':
      return { ...state, currentQuestion: action.payload, error: null };
    case 'ADD_HISTORY':
      return {
        ...state,
        studyHistory: [action.payload, ...state.studyHistory],
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_HISTORY':
      return { ...state, studyHistory: [] };
    default:
      return state;
  }
};

const StudyContext = createContext<{
  state: StudyState;
  setQuestion: (question: Question) => void;
  addHistoryItem: (item: StudyHistoryItem) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearHistory: () => void;
} | null>(null);

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(studyReducer, initialState);

  const setQuestion = useCallback((question: Question) => {
    dispatch({ type: 'SET_QUESTION', payload: question });
  }, []);

  const addHistoryItem = useCallback((item: StudyHistoryItem) => {
    dispatch({ type: 'ADD_HISTORY', payload: item });
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearHistory = useCallback(() => {
    dispatch({ type: 'CLEAR_HISTORY' });
  }, []);

  return (
    <StudyContext.Provider
      value={{
        state,
        setQuestion,
        addHistoryItem,
        setLoading,
        setError,
        clearHistory,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
};