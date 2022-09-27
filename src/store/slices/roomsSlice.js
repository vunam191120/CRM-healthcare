import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import roomAPI from '../../api/room';

export const fetchRooms = createAsyncThunk(
  'roomsSlice/fetchRooms',
  async (clinic_id) => {
    try {
      const result = await roomAPI.getAll(clinic_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchRoom = createAsyncThunk(
  'roomsSlice/fetchRoom',
  async (room_id) => {
    try {
      const result = await roomAPI.getOne(room_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const createRoom = createAsyncThunk(
  'roomsSlice/createRoom',
  async (room) => {
    try {
      const result = await roomAPI.create(room);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.response.data.errors[0]);
    }
  }
);

export const updateRoom = createAsyncThunk(
  'roomsSlice/updateRoom',
  async (room) => {
    try {
      const result = await roomAPI.update(room);
      return result;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  'roomsSlice/deleteRoom',
  async (room_id) => {
    try {
      const result = await roomAPI.delete(room_id);
      if (result.data.data === 1) {
        return room_id;
      } else {
        return Promise.reject('Delete failed');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
// Reducer

const roomsSlice = createSlice({
  name: 'roomsSlice',
  initialState: {
    rooms: [],
    roomNeedUpdate: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Rooms
    [fetchRooms.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchRooms.fulfilled]: (state, action) => {
      state.rooms = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchRooms.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Room
    [fetchRoom.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchRoom.fulfilled]: (state, action) => {
      state.roomNeedUpdate = {
        ...state.roomNeedUpdate,
        ...action.payload,
      };
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchRoom.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create Room
    [createRoom.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createRoom.fulfilled]: (state, action) => {
      state.rooms = [...state.rooms, action.payload];
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Added new room successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [createRoom.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Room
    [updateRoom.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateRoom.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Update clinic successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [updateRoom.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Room
    [deleteRoom.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteRoom.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Deleted room successfully!', 3));
      state.rooms = state.rooms.filter(
        (room) => room.room_id !== action.payload
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteRoom.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selectors

export const selectRooms = (state) => state.rooms.rooms;

export const selectRoomsLoading = (state) => state.rooms.isLoading;

export const selectRoomsError = (state) => state.rooms.hasError;

export const selectRoomNeedUpdate = (state) => state.rooms.roomNeedUpdate;

export default roomsSlice.reducer;
