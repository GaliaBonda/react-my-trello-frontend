const initialState = {};

export default function reducer(state = initialState, action: { type: string; payload?: unknown }): unknown {
  switch (action.type) {
    default: {
      return { ...state };
    }
  }
}
