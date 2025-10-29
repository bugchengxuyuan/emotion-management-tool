import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { storage } from '@/lib/storage';
import type { EmotionEntry, ThoughtRecord, DearManPlan } from '@/types';

interface AppState {
  emotions: EmotionEntry[];
  thoughts: ThoughtRecord[];
  dearManPlans: DearManPlan[];
  isLoading: boolean;
  activeTab: string;
}

type AppAction =
  | { type: 'SET_EMOTIONS'; payload: EmotionEntry[] }
  | { type: 'ADD_EMOTION'; payload: EmotionEntry }
  | { type: 'SET_THOUGHTS'; payload: ThoughtRecord[] }
  | { type: 'ADD_THOUGHT'; payload: ThoughtRecord }
  | { type: 'SET_DEAR_MAN_PLANS'; payload: DearManPlan[] }
  | { type: 'ADD_DEAR_MAN_PLAN'; payload: DearManPlan }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ACTIVE_TAB'; payload: string };

const initialState: AppState = {
  emotions: [],
  thoughts: [],
  dearManPlans: [],
  isLoading: true,
  activeTab: 'guide',
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_EMOTIONS':
      return { ...state, emotions: action.payload };
    case 'ADD_EMOTION':
      return { ...state, emotions: [...state.emotions, action.payload] };
    case 'SET_THOUGHTS':
      return { ...state, thoughts: action.payload };
    case 'ADD_THOUGHT':
      return { ...state, thoughts: [...state.thoughts, action.payload] };
    case 'SET_DEAR_MAN_PLANS':
      return { ...state, dearManPlans: action.payload };
    case 'ADD_DEAR_MAN_PLAN':
      return { ...state, dearManPlans: [...state.dearManPlans, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from storage on mount
  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const [emotions, thoughts, dearManPlans] = await Promise.all([
          storage.get<EmotionEntry[]>('emotions'),
          storage.get<ThoughtRecord[]>('thoughts'),
          storage.get<DearManPlan[]>('dearManPlans'),
        ]);

        if (emotions) dispatch({ type: 'SET_EMOTIONS', payload: emotions });
        if (thoughts) dispatch({ type: 'SET_THOUGHTS', payload: thoughts });
        if (dearManPlans) dispatch({ type: 'SET_DEAR_MAN_PLANS', payload: dearManPlans });
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadData();
  }, []);

  // Save data to storage when it changes
  useEffect(() => {
    if (!state.isLoading) {
      storage.set('emotions', state.emotions);
    }
  }, [state.emotions, state.isLoading]);

  useEffect(() => {
    if (!state.isLoading) {
      storage.set('thoughts', state.thoughts);
    }
  }, [state.thoughts, state.isLoading]);

  useEffect(() => {
    if (!state.isLoading) {
      storage.set('dearManPlans', state.dearManPlans);
    }
  }, [state.dearManPlans, state.isLoading]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
