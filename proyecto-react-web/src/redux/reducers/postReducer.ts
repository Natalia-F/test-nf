// reducers/postsReducer.ts
import { PostModel } from '@/models/PostModel';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://localhost:7294/post';

// Definición de tipos


interface PostsState {
  posts: PostModel[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Acciones asíncronas
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(API_URL);
  return response.data as PostModel[];
});

export const addPost = createAsyncThunk('posts/addPost', async (post: Omit<PostModel, 'postId'>) => {
  const response = await axios.post(API_URL, post);
  return response.data as PostModel;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: number) => {
  await axios.delete(`${API_URL}?id=${postId}`);
  return postId;
});

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostModel[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<PostModel>) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.postId !== action.payload);
      });
  },
});

export default postsSlice.reducer;
