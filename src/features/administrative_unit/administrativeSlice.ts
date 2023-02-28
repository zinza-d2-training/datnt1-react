import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { publicRequest } from 'callsApi';
import { RootState } from 'store';

export interface LoginInfo {
  email: string;
  password: string;
}

export interface Ward {
  ward_id: number;
  name: string;
  district_id: number;
}

export interface District {
  district_id: number;
  name: string;
  province_id: number;
}

export interface Province {
  province_id: number;
  name: string;
}

export interface AdministrativeState {
  wards: Ward[];
  districts: District[];
  provinces: Province[];
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
  loading: boolean;
}

const initialState: AdministrativeState = {
  wards: [],
  districts: [],
  provinces: [],
  status: 'idle',
  loading: false
};

export const getWardsAsync = createAsyncThunk(
  'administrative_unit/wards',
  async (_, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get('administrative-unit/wards');

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDistrictsAsync = createAsyncThunk(
  'administrative_unit/districts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get('administrative-unit/districts');

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProvincesAsync = createAsyncThunk(
  'administrative_unit/provinces',
  async (_, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get('administrative-unit/provinces');

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDistrictsByProvinceIdAsync = createAsyncThunk(
  'administrative_unit/districtsByProvinceId',
  async (province: Province, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get(
        `administrative-unit/districts/${province?.province_id}`
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getWardsByDistrictIdAsync = createAsyncThunk(
  'administrative_unit/wardsByDistrictId',
  async (district: District, { rejectWithValue }) => {
    try {
      const res = await publicRequest.get(
        `administrative-unit/wards/${district?.district_id}`
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const administrativeUnitSlice = createSlice({
  name: 'administrative_unit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWardsAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getWardsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.wards = action.payload;
      })
      .addCase(getWardsAsync.rejected, (state) => {
        state.status = 'rejected';
        state.loading = false;
      });

    builder
      .addCase(getDistrictsAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getDistrictsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.districts = action.payload;
      })
      .addCase(getDistrictsAsync.rejected, (state) => {
        state.status = 'rejected';
        state.loading = false;
      });

    builder
      .addCase(getProvincesAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getProvincesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.provinces = action.payload;
      })
      .addCase(getProvincesAsync.rejected, (state) => {
        state.status = 'rejected';
        state.loading = false;
      });

    builder
      .addCase(getDistrictsByProvinceIdAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getDistrictsByProvinceIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.districts = action.payload;
      })
      .addCase(getDistrictsByProvinceIdAsync.rejected, (state) => {
        state.status = 'rejected';
        state.loading = false;
      });

    builder
      .addCase(getWardsByDistrictIdAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getWardsByDistrictIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.wards = action.payload;
      })
      .addCase(getWardsByDistrictIdAsync.rejected, (state) => {
        state.status = 'rejected';
        state.loading = false;
      });
  }
});

export const {} = administrativeUnitSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state Se.lectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user;

export default administrativeUnitSlice.reducer;
