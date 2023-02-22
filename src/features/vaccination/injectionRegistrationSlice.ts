import { publicRequest, userRequest } from 'callsApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SearchByKeyInputs } from 'pages/AdminRegistration';

export interface InjectionRegistrationInfo {
  injection_registration_id?: number;
  health_insurance_number?: string;
  occupation?: string;
  work_unit?: string;
  address?: string;
  expected_injection_date?: Date | string;
  injection_session?: string;
  injection_time?: Date | string;
  status?: string;
  injection_register_code?: string;
  injection_agreement?: boolean;
  priority_group_id?: number;
  user_id?: number;
  vaccine_id?: number;
  vaccination_site_id?: number;
}

export interface CreateInjectionRegistration {
  health_insurance_number?: string;
  occupation?: string;
  work_unit?: string;
  address?: string;
  expected_injection_date?: Date | string;
  injection_session?: string;
  priority_group_id: number;
}

export interface UpdateInjectionRegistrationByUser {
  injection_registration_id?: number;
  vaccination_agreement?: boolean;
  status?: string;
  injection_register_code?: string;
}

export interface UpdateInjectionRegistrationByAdmin {
  injection_registration_id?: number;
  expected_injection_date?: Date | string;
  status?: string;
  vaccine_id?: number;
  vaccination_site_id?: number;
}

export interface RegisterResult {
  health_insurance_number: string;
  fullname: string;
  birthday: string;
  gender: string;
  identification_card: string;
  status: string;
  expected_injection_date?: Date | string;
  vaccine_name?: string;
  vaccination_site_name?: string;
  lot_number?: string;
}

export interface RegisterInfo {
  injection_registration_id?: number;
  fullname: string;
  identification_card: string;
  expected_injection_date: string;
  vaccine_name: string;
  lot_number: string;
  vaccination_site_name: string;
  status: string;
}

export const SearchFilterDefault: SearchByKeyInputs = {
  fullname: '',
  identification_card: ''
};

export interface InjectionRegistrationState {
  injectionRegistrationInfo: InjectionRegistrationInfo;
  registerInfo: RegisterInfo[];
  registerResult: RegisterResult[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  loading: true | false;
}

const initialState: InjectionRegistrationState = {
  injectionRegistrationInfo: {},
  registerInfo: [],
  registerResult: [],

  status: 'idle',
  loading: false
};

export const addInjectionRegistrationAsync = createAsyncThunk(
  'user/add-injection-registration',
  async (data: CreateInjectionRegistration) => {
    const res = await userRequest.post<CreateInjectionRegistration>(
      'injection-registration',
      data
    );

    return res.data;
  }
);

export const updateInjectionRegistrationByUserAsync = createAsyncThunk(
  'user/update-injection-registration',
  async (data: UpdateInjectionRegistrationByUser) => {
    const res = await userRequest.put<InjectionRegistrationInfo>(
      `injection-registration/${data.injection_registration_id}/by-user`,
      data
    );

    return res.data;
  }
);

export const getRegisterResultByUserId = createAsyncThunk(
  'user/register-reseult',
  async (_) => {
    const res = await userRequest.get<RegisterResult[]>(
      `injection-registration/by-user`
    );

    return res.data;
  }
);

export const getAllRegisterInfo = createAsyncThunk(
  'user/register-info',
  async (searchFilter: SearchByKeyInputs) => {
    const res = await userRequest.get(
      `injection-registration?fullname=${searchFilter.fullname}&identification_card=${searchFilter.identification_card}`
    );

    return res.data;
  }
);

export const updateInjectionRegistrationByAdminAsync = createAsyncThunk(
  'admin/update-injection-registration',
  async (data: UpdateInjectionRegistrationByAdmin) => {
    const res = await userRequest.put<RegisterInfo[]>(
      `injection-registration/${data.injection_registration_id}`,
      data
    );

    return res.data;
  }
);

export const injectionRegistrationSlice = createSlice({
  name: 'injection-registration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInjectionRegistrationAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(addInjectionRegistrationAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.injectionRegistrationInfo = action.payload;
      })
      .addCase(addInjectionRegistrationAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });

    builder
      .addCase(getRegisterResultByUserId.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getRegisterResultByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.registerResult = action.payload;
      })
      .addCase(getRegisterResultByUserId.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });

    builder
      .addCase(getAllRegisterInfo.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(getAllRegisterInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.registerInfo = action.payload;
      })
      .addCase(getAllRegisterInfo.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });

    builder
      .addCase(updateInjectionRegistrationByAdminAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(
        updateInjectionRegistrationByAdminAsync.fulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.loading = false;
          state.registerInfo = action.payload;
        }
      )
      .addCase(updateInjectionRegistrationByAdminAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });

    builder
      .addCase(updateInjectionRegistrationByUserAsync.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
      })
      .addCase(
        updateInjectionRegistrationByUserAsync.fulfilled,
        (state, action) => {
          state.status = 'succeeded';
          state.loading = false;
          state.injectionRegistrationInfo = action.payload;
        }
      )
      .addCase(updateInjectionRegistrationByUserAsync.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export const {} = injectionRegistrationSlice.actions;

export default injectionRegistrationSlice.reducer;
