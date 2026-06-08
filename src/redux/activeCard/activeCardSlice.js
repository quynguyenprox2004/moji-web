import { createSlice } from '@reduxjs/toolkit'

// Khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
  currentActiveCard: null
}

// Khởi tạo một cái Slice trong kho lưu trữ - Redux Store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {
    // Lưu ý là ở đây luôn luôn cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux

    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    },


    updateCurrentActiveCard: (state, action) => {
      // actione.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây chúng ta gán nó ra một biến có nghĩa hơn
      const fullCard = action.payload

      // Xử lý dữ liệu nếu cần thiết...
      // ...

      // Update lại dữ liệu của cái currentActiveCard
      state.currentActiveCard = fullCard
    }
  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  // eslint-disable-next-line no-unused-vars
  extraReducers: (builder) => { }
})

// Actions creator là các function được tạo ra dựa trên tên reducer mà chúng ta đã khai báo ở trên, có nhiệm vụ tạo ra một action object chuẩn với cấu trúc { type: 'tênReducer', payload: dữ liệu } để component có thể dispatch lên Redux Store và được reducer xử lý
// Action creators are generated for each case reducer function
// Actions: Là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó đề cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.

export const { updateCurrentActiveCard, clearCurrentActiveCard } = activeCardSlice.actions // Export các action creator để component có thể dispatch

export const selectCurrentActiveCard = (state) => state.activeCard.currentActiveCard // Export selector để component có thể lấy dữ liệu từ Redux Store

export const activeCardReducer = activeCardSlice.reducer // Export reducer để cấu hình vào Redux Store