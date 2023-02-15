import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { publicRequest, userRequest } from 'callsApi';
import { SearchByKeyInputs } from 'pages/AdminPlace';
import { RootState } from 'store';

export interface VaccinationSiteSearchFilter {
  province_id?: number;
  district_id?: number;
  ward_id?: number;
}

export interface VaccinationSiteInfo {
  vaccination_site_id: number;
  name: string;
  address: string;
  leader: string;
  number_of_tables: number;
  ward_name: string;
  district_name: string;
  province_name: string;
}

export interface UpdateVaccinationSite {
  vaccination_site_id: number;
  name: string;
  address: string;
  leader: string;
  number_of_tables: number;
}

export interface VaccinationSiteState {
  vaccinationSites: VaccinationSiteInfo[];
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
  loading: boolean;
}

const initialState: VaccinationSiteState = {
  vaccinationSites: [],
  status: 'idle',
  loading: false
};

export const SearchFilterDefault: VaccinationSiteSearchFilter = {
  province_id: undefined,
  district_id: undefined,
  ward_id: undefined
};

export const getVaccinationSiteAsync = createAsyncThunk(
  'vaccination-site/get',
  async (
    searchFilter: VaccinationSiteSearchFilter | SearchByKeyInputs,
    { rejectWithValue }
  ) => {
    try {
      if ('province_id' in searchFilter) {
        const res = await publicRequest.get(
          `vaccination-site?province_id=${searchFilter.province_id}&district_id=${searchFilter.district_id}&ward_id=${searchFilter.ward_id}`
        );

        return res.data;
      } else if ('name' in searchFilter) {
        const res = await publicRequest.get(
          `vaccination-site/search-key?name=${searchFilter.name}&address=${searchFilter.address}`,
          {
            data: searchFilter
          }
        );

        return res.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateVaccinationSiteByIdAsync = createAsyncThunk(
  'vaccination-site/update',
  async (updateVaccinationData: UpdateVaccinationSite, { rejectWithValue }) => {
    try {
      const { vaccination_site_id, ...updateData } = updateVaccinationData;
      const res = await userRequest.post(
        `vaccination-site/${updateVaccinationData.vaccination_site_id}`,
        updateData
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const vaccinationSiteSlice = createSlice({
  name: 'vaccination-site',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVaccinationSiteAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getVaccinationSiteAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.vaccinationSites = action.payload;
      })
      .addCase(getVaccinationSiteAsync.rejected, (state) => {
        state.status = 'rejected';
        state.loading = false;
      });

    builder
      .addCase(updateVaccinationSiteByIdAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(updateVaccinationSiteByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.vaccinationSites = action.payload;
      })
      .addCase(updateVaccinationSiteByIdAsync.rejected, (state) => {
        state.status = 'rejected';
        state.loading = false;
      });
  }
});

export const {} = vaccinationSiteSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state Se.lectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user;

export default vaccinationSiteSlice.reducer;
