import { useCallback, useEffect, useReducer, useState } from 'react';
import { fetchCourseById } from '../services/courseService.js';

const initialState = { course: null, status: 'loading', error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading', error: null };
    case 'success':
      return { course: action.course, status: 'success', error: null };
    case 'error':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}

export function useCourse(id) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  useEffect(() => {
    let isActive = true;
    dispatch({ type: 'loading' });

    fetchCourseById(id)
      .then((course) => {
        if (!isActive) return;
        dispatch({ type: 'success', course });
      })
      .catch((error) => {
        if (!isActive) return;
        dispatch({ type: 'error', error });
      });

    return () => {
      isActive = false;
    };
  }, [id, reloadKey]);

  return { ...state, reload };
}
