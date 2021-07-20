import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllCustomer, getCustomerById } from '../../apis/customerApis';
import { ICustomer } from '../../features/customer/types/Customer';

export interface CounterState {
  list: {
    data: ICustomer[];
    pageOptions: any;
  };
  current: ICustomer | null;
}

const initialState: CounterState = {
  list: {
    data: [],
    pageOptions: {},
  },
  current: null,
};

export const getCustomerList = createAsyncThunk(
  'customer/getCustomerList',
  async () => {
    const data: any = await getAllCustomer();
    return data;
  }
);

export const getCustomerDetail = createAsyncThunk(
  'customer/getCustomerDetail',
  async (id: number) => {
    const data: any = await getCustomerById(id);
    return data;
  }
);

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setList: (state, { payload }) => {
      state.list = payload;
    },
    setCurrent: (state, { payload }) => {
      state.current = payload;
    },
  },
  extraReducers: {
    [getCustomerList.fulfilled as any]: (state, { payload }) => {
      state.list.data = payload;
    },
    [getCustomerDetail.fulfilled as any]: (state, { payload }) => {
      state.current = payload;
    },
  },
});

export const { setList, setCurrent } = customerSlice.actions;

export default customerSlice.reducer;
