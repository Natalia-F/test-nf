'use client';
import { PostModel } from "@/models/PostModel";
import { addPost, deletePost, fetchPosts } from "@/redux/reducers/postReducer";
import { AppDispatch } from "@/redux/store";
import { IconTrash } from "@tabler/icons-react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "./components/postForm";
import NotificationPost from "./components/notification";

const listPost = [
    {id : 1, name: 'Lindsay Walton', description: 'Front-end Developer'},
  ]

export default function PostTable() {
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: any) => state.posts.posts);
    const postStatus = useSelector((state: any) => state.posts.status);
    const error = useSelector((state: any) => state.posts.error);
  
    const [searchTerm, setSearchTerm] = useState('');
    const [formOpen, setFormOpen] = useState<boolean>(false);
  
    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    const handleAddPost = (name: string, description: string) => {
        if (name.trim() !== '') {
            dispatch(addPost({ namePost: name, description: description }));
        }
        setFormOpen(false);
    };

    const handleDeletePost = (postId: number) => {
        dispatch(deletePost(postId));
    };

    const filteredPosts: PostModel[] = posts.filter((post: PostModel) =>
        post.namePost.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
            <div className="mx-auto max-w-3xl bg-white py-12 rounded-lg shadow-lg shadow-indigo-800">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <div>
                                <label htmlFor="postinput" className="sr-only">
                                    Post
                                </label>
                                <input
                                    id="postinput"
                                    name="postinput"
                                    type="search"
                                    placeholder="Buscar post..."
                                    className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={searchTerm || ''}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                               />
                            </div>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => setFormOpen(true)}
                            >
                                Nuevo Post
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                                            >
                                                Nombre
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Descripcion
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                                                <span className="sr-only">Eliminar</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {postStatus === 'loading' && (
                                            <tr>
                                                <td colSpan={3} className="text-center py-4">Cargando...</td>
                                            </tr>
                                        )}
                                        {postStatus === 'failed' && (
                                            <tr>
                                                <td colSpan={3} className="text-center py-4">Error: {error}</td>
                                            </tr>
                                        )}
                                        {
                                            postStatus === 'succeeded' && filteredPosts.length === 0 &&(
                                                <tr>
                                                <td colSpan={3} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center text-gray-700 sm:pl-6 lg:pl-8">
                                                    Sin datos para mostrar.
                                                </td>                                                
                                            </tr>
                                            
                                        )}
                                        {postStatus === 'succeeded' && 
                                        
                                            filteredPosts.map((post: PostModel) =>  (
                                            <tr key={post.postId}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                                    {post.namePost}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{post.description}</td>
                                                <td className="relative whitespace-nowrap py-4 text-left text-sm font-medium sm:pr-6 lg:pr-8">
                                                    <button onClick={() => handleDeletePost(post.postId)}>
                                                        <IconTrash className="h-5 w-5 text-red-500" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {formOpen && 
                <PostForm 
                    onCreated={handleAddPost}
                    onCloseModal={() => setFormOpen(false)}
                />
            }
            {postStatus === 'failed' && (
                <NotificationPost/>                            
            )}
        </div>
      )
}