import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from './stores/reducers/index'
import type { AppDispatch } from './stores'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()