import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPlanAPI } from '../../api/plan/plan';
import { fetchCommentAPI } from '../../api/plan/comment';

const initialState = {
  plans: [], // 전체 플랜 리스트
  currentPlan: null, // 특정 플랜 상세 정보(댓글 리스트 포함)
  error: null, // 오류 메시지
};

export const fetchPlanAsync = createAsyncThunk(
  'plan/fetchPlanAsyne',
  async (planId, { getState, rejectWithValue }) => {
    const state = getState().plan;
    if (state.currentPlan?.id === planId) {
      return state.currentPlan;
    }
    try {
      const [plan, comments] = await Promise.all([fetchPlanAPI(planId), fetchCommentAPI(planId)]);
      console.log('하이');
      console.log(comments);
      return { ...plan, comments: Array.isArray(comments) ? comments : [] };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 플랜 상세 정보 가져오기
      .addCase(fetchPlanAsync.fulfilled, (state, action) => {
        state.currentPlan = action.payload;
        state.error = null;
      })
      .addCase(fetchPlanAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default planSlice.reducer;