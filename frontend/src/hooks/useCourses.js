import { useCallback, useEffect, useReducer, useState } from 'react';
import { fetchCourses } from '../services/courseService.js';

const initialState = { courses: [], categories: [], status: 'loading', error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading', error: null };
    case 'success':
      return { courses: action.courses, categories: action.categories, status: 'success', error: null };
    case 'error':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}

export function useCourses({ category = '', search = '' } = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: 'loading' });

    fetchCourses({ category, search }, { signal: controller.signal })
      .then(({ courses, categories }) => {
        dispatch({ type: 'success', courses, categories });
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        dispatch({ type: 'error', error });
      });

    return () => controller.abort();
  }, [category, search, reloadKey]);

  return { ...state, reload };
}
