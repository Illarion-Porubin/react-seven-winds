import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDataNode } from '../../types';
import axios from 'axios';



export const fetchGetTreeRows = createAsyncThunk<IDataNode[], undefined, { rejectValue: string }>(
  "api/data", async (_, { rejectWithValue }) => {
    const { data } = await axios.get("http://185.244.172.108:8081/v1/outlay-rows/entity/133810/row/list");
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data;
  });

export const fetchCreateRowInEntity = createAsyncThunk<IDataNode[], {parentId: number, newChild: IDataNode}, { rejectValue: string }>(
  "api/post", async (parameters, { rejectWithValue }) => {
    const { data } = await axios.post(`http://185.244.172.108:8081/v1/outlay-rows/entity/133810/row/create`, parameters.newChild);
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data.current.id;
  });

export const fetchUpdateRow = createAsyncThunk<IDataNode[], {parentId: number, newChild: IDataNode}, { rejectValue: string }>(
  "api/post", async (params, { rejectWithValue }) => {
    console.log(params, 'fetchUpdateRow');
    const { data } = await axios.post(`http://185.244.172.108:8081/v1/outlay-rows/entity/133810/row/${params.parentId}/post`);
    if (!data) {
      return rejectWithValue("Server Error!");
      }
    return data;
  });

export const fetchDeleteRow = createAsyncThunk<IDataNode[], number, { rejectValue: string }>(
  "api/delete", async (eID, { rejectWithValue }) => {
    console.log(eID, 'fetchDeleteRow');
    const { data } = await axios.delete(`http://185.244.172.108:8081/v1/outlay-rows/entity/133810/row/${eID}/delete`);
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data;
});


export interface IContentState {
  data: IDataNode[];
  isLoading: 'idle' | 'loading' | 'loaded' | 'error';
  error: string | null;
}

export interface IContentState {
  data: IDataNode[];
  isLoading: 'idle' | 'loading' | 'loaded' | 'error';
  error: string | null;
}

const initialState: IContentState = {
  data: [],
  isLoading: 'idle',
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    addChild: (state, action: PayloadAction<{ parentId: number; newChild: IDataNode }>) => {
      const addNode = (nodes: IDataNode[]): IDataNode[] => {
        return nodes.map(node => {
          if (node.id === action.payload.parentId) {
            const newChild = { ...action.payload.newChild, level: node.level + 1 }; // Remove
            return { ...node, child: [...(node.child || []), newChild] };
          } else if (node.child) {
            return { ...node, child: addNode(node.child) };
          }
          return node;
        });
      };
      state.data = addNode(state.data);
    },
    deleteChild: (state, action: PayloadAction<number>) => {
      const deleteNode = (nodes: IDataNode[]): IDataNode[] => {
        return nodes.filter(node => {
          if (node.id === action.payload) {
            return false;
          } else if (node.child) {
            node.child = deleteNode(node.child);
          }
          return true;
        });
      };
      state.data = deleteNode(state.data);
    },
    updateNodeValue: (state, action: PayloadAction<{ nodeId: number; index: number; value: string }>) => {
      const updateNode = (nodes: IDataNode[]): IDataNode[] => {
        return nodes.map(node => {
          if (node.id === action.payload.nodeId) {
            const values = [node.rowName, node.total.toString(), node.salary.toString(), node.materials.toString(), node.mainCosts.toString()];
            values[action.payload.index] = action.payload.value;
            return { ...node, rowName: values[0], total: parseFloat(values[1]), salary: parseFloat(values[2]), materials: parseFloat(values[3]), mainCosts: parseFloat(values[4]) };
          } else if (node.child) {
            return { ...node, child: updateNode(node.child) };
          }
          return node;
        });
      };
      state.data = updateNode(state.data);
    }
  },
  extraReducers: (builder) => {
    builder
      ///fetchGetTreeRows
      .addCase(fetchGetTreeRows.pending, (state) => {
        state.data = [];
        state.isLoading = "loading";
      })
      .addCase(fetchGetTreeRows.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = "loaded";
      })
      .addCase(fetchGetTreeRows.rejected, (state) => {
        state.data = [];
        state.isLoading = "error";
      })
  },
});

export const { addChild, deleteChild, updateNodeValue } = contentSlice.actions;
export default contentSlice.reducer;