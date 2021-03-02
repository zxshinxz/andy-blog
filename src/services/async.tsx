import { Reducer, useEffect, useReducer } from 'react';

type LoadingAction = {
  type: 'LOADING';
};

type SuccessAction<T> = {
  type: 'SUCCESS';
  data: T;
};

type ErrorAction<T> = {
  type: 'ERROR';
  error: T;
};

type AsyncAction<D, E> = LoadingAction | SuccessAction<D> | ErrorAction<E>;

export type AsyncState<D, E> = {
  loading: boolean;
  data: D | null;
  error: E | null;
};

export type AsyncEffectState<D, E, F extends AnyFunction> = {
  state: AsyncState<D, E>;
  run: (params: Parameters<F>) => Promise<void>;
};

function asyncReducer<D, E>(state: AsyncState<D, E>, action: AsyncAction<D, E>): AsyncState<D, E> {
  switch (action.type) {
    default:
      return {
        loading: false,
        data: null,
        error: null,
      };
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
  }
}

type AnyFunction = (...args: any) => Promise<any>;

function useAsync<D, E, F extends AnyFunction>(promiseFn: F): AsyncEffectState<D, E, F> {
  const [state, dispatch] = useReducer<Reducer<AsyncState<D, E>, AsyncAction<D, E>>>(asyncReducer, {
    loading: false,
    data: null,
    error: null,
  });

  async function run(params: Parameters<F>) {
    dispatch({ type: 'LOADING' });
    try {
      const data = await promiseFn(...params);
      dispatch({
        type: 'SUCCESS',
        data,
      });
    } catch (e) {
      dispatch({
        type: 'ERROR',
        error: e,
      });
    }
  }

  return { state, run };
}

function useAsyncEffect<D, E, F extends AnyFunction>(promiseFn: F, params: Parameters<F>): AsyncEffectState<D, E, F> {
  const { state, run } = useAsync<D, E, F>(promiseFn);

  useEffect(() => {
    run(params);
  }, []);

  return {
    state,
    run,
  };
}

export default useAsync;
export { useAsyncEffect };
