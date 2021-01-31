import * as ActionTypes from '../constants/actionTypes';
import reducer from './nodes';
import initialState from './initialState';

describe('Reducers::Nodes', () => {
  const getInitialState = () => {
    return initialState().nodes;
  };

  const nodeA = {
    url: 'http://localhost:3002',
    online: false,
    name: null,
  };

  const nodeB = {
    url: 'http://localhost:3003',
    online: false,
    name: null,
  };

  it('should set initial state by default', () => {
    const action = {type: 'unknown'};
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_START', () => {
    const appState = {
      list: [nodeA, nodeB],
    };
    const action = {type: ActionTypes.CHECK_NODE_STATUS_START, node: nodeA};
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true,
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB],
    };
    const action = {
      type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
      node: nodeA,
      res: {node_name: 'alpha'},
    };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false,
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false,
        },
        nodeB,
      ],
    };
    const action = {type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA};
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          name: 'alpha',
          loading: false,
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle LOAD_BLOCK_FAIL', () => {
    const appState = {
      list: [
        nodeA,
        nodeB,
      ],
    };
    const action = {type: ActionTypes.LOAD_BLOCK_FAIL, node: nodeA};
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: [],
          blocksStatus: ActionTypes.LOAD_BLOCK_FAIL
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle LOAD_BLOCK_START', () => {
    const appState = {
      list: [
        nodeA,
        nodeB,
      ],
    };
    const action = {type: ActionTypes.LOAD_BLOCK_START, node: nodeA};
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: [],
          blocksStatus: ActionTypes.LOAD_BLOCK_START
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle LOAD_BLOCK_SUCCESS', () => {
    const appState = {
      list: [
        nodeA,
        nodeB,
      ],
    };
    const action = {
      type: ActionTypes.LOAD_BLOCK_SUCCESS, 
      node: nodeA, 
      res: { data: [{id: 1}] } 
    };
      
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: action.res.data,
          blocksStatus: ActionTypes.LOAD_BLOCK_SUCCESS
        },
        nodeB,
      ],
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
