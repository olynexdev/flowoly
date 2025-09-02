import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';

// Create a typed version of useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
