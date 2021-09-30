const initialState = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function reducer(state = initialState, action: { type: string; payload?: any }): unknown {
  switch (action.type) {
    default: {
      return { ...state, ...action.payload };
    }
  }
}
