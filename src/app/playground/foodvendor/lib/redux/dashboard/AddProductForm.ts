import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { dishSchema } from "../../../dashboard/dish/schema";

// Define TypeScript types
type FormState = {
  name: string;
  email: string;
  password: string;
  errors: Record<string, string> | null;
  isSubmitting: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  password: "",
  errors: null,
  isSubmitting: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{ field: keyof FormState; value: string }>,
    ) => {
      state[action.payload.field] = action.payload.value;
      if (state.errors) state.errors[action.payload.field] = "";
    },
    setErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = action.payload;
    },
    submitForm: (state) => {
      state.isSubmitting = true;
    },
    submitSuccess: (state) => {
      state.isSubmitting = false;
      state.errors = null;
    },
    submitFailure: (state, action: PayloadAction<Record<string, string>>) => {
      state.isSubmitting = false;
      state.errors = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  setField,
  setErrors,
  submitForm,
  submitSuccess,
  submitFailure,
  resetForm,
} = formSlice.actions;
export default formSlice.reducer;
