import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchGetContent = createAsyncThunk<any, undefined, { rejectValue: string }>(
  "api/fetchGetContent", async (_, { rejectWithValue }) => {
    const { data } = await axios.get("http://185.244.172.108:8081/v1/outlay-rows/entity/4/row/list");
    console.log(data);
    if (!data) {
      return rejectWithValue("Server Error!");
    }
    return data;
  });


interface DataNode {
  id: number;
  rowName: string;
  total: number;
  salary: number;
  materials: number;
  mainCosts: number;
  child?: DataNode[];
  level: number; 
}

export interface IContentState {
  data: DataNode[];
  isLoading: 'idle' | 'loading' | 'loaded' | 'error';
  error: string | null;
}

const initialData: DataNode[] = [
  {
    id: 0,
    rowName: 'string',
    total: 1,
    salary: 2033,
    materials: 0,
    mainCosts: 0,
    level: 0, // Initialize level
    child: [
      {
        id: 1,
        rowName: 'string',
        total: 1,
        salary: 2033,
        materials: 0,
        mainCosts: 0,
        level: 1, // Initialize level
        child: [
          {
            id: 2,
            rowName: 'string',
            total: 0,
            salary: 2033,
            materials: 0,
            mainCosts: 0,
            level: 2, // Initialize level
            child: [],
          },
        ],
      },
    ],
  },
];

export interface IContentState {
  data: any;
  isLoading: 'idle' | 'loading' | 'loaded' | 'error';
  error: string | null;
}

const initialState: IContentState = {
  data: initialData,
  isLoading: 'idle',
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    addChild: (state, action: PayloadAction<{ parentId: number; newChild: DataNode }>) => {
      const addNode = (nodes: DataNode[]): DataNode[] => {
        return nodes.map(node => {
          if (node.id === action.payload.parentId) {
            const newChild = { ...action.payload.newChild, level: node.level + 1 }; // Ensure correct level
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
      const deleteNode = (nodes: DataNode[]): DataNode[] => {
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
      const updateNode = (nodes: DataNode[]): DataNode[] => {
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
      ///fetchGetContent
      .addCase(fetchGetContent.pending, (state) => {
        state.data = [];
        state.isLoading = "loading";
      })
      .addCase(fetchGetContent.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = "loaded";
      })
      .addCase(fetchGetContent.rejected, (state) => {
        state.data = [];
        state.isLoading = "error";
      })
  },
});

export const { addChild, deleteChild, updateNodeValue } = contentSlice.actions;
export default contentSlice.reducer;