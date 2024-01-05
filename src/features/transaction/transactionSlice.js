import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  getTransaction,
  deleteTransaction,
  editTransaction,
} from "./transactionApi";

const initialState = {
  transaction: [],
  isError: false,
  isLoading: false,
  editing: {},
  error: "",
};

export const fetchTransactions = createAsyncThunk(
  "/transaction/fetchTransaction",
  async () => {
    const transaction = await getTransaction();
    return transaction;
  }
);

export const createTransactions = createAsyncThunk(
  "/transaction/createTransaction",
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);

export const editTransactions = createAsyncThunk(
  "/transaction/editTransaction",
  async ({ id, data }) => {
    const transaction = await editTransaction(id, data);
    return transaction;
  }
);

export const deleteTransactions = createAsyncThunk(
  "/transaction/deleteTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },
    editInActive: (sate, action) => {
      sate.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transaction = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error;
        state.transaction = [];
      })
      .addCase(createTransactions.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transaction.push(action.payload);
      })
      .addCase(createTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(editTransactions.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(editTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        const indexToUpdate = state.transaction.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transaction[indexToUpdate] = action.payload;
      })
      .addCase(editTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteTransactions.pending, (state, action) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(deleteTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.transaction = state.transaction.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(deleteTransactions.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default transactionSlice.reducer;

export const { editActive, editInActive } = transactionSlice.actions;
