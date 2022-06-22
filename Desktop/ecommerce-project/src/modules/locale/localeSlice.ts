import { createSlice } from "@reduxjs/toolkit"

interface LocaleProps {
  locale: "vi" | "en"
}

const initialState: LocaleProps = {
  locale: "vi",
}

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    changeLocale: (state, { payload }: { payload: "vi" | "en" }) => {
      state.locale = payload
    },
  },
})

export default localeSlice.reducer

export const { changeLocale } = localeSlice.actions
