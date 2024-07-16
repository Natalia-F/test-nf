'use client'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IconXboxX } from '@tabler/icons-react';

interface PostFormProp{
    onCreated : (name: string, description: string) => void;
    onCloseModal : () => void;
}

export default function PostForm({onCreated, onCloseModal}:PostFormProp) {
    const [open, setOpen] = useState(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [postName, setPostName] = useState<string | null>(null);
    const [postDesc, setPostDesc] = useState<string | null>(null);

    function onSavePost(){
        setIsError(false);
        if (postName != null && postName!= "" && postDesc!=null && postDesc!="") {
            onCreated(postName, postDesc);
            onCloseModal();
            return;
        }
        setIsError(true);
    }

    function onClose(){
        setOpen(false);
        onCloseModal();
    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
            
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="flex justify-end">
                            <button
                            onClick={onClose}
                            >
                                <IconXboxX className="h-5 w-5 text-black"/>
                            </button>
                            
                        </div>                       
                        <div>
                            <div className="mt-3 sm:mt-5">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900 text-center">
                                    Crear Post
                                </DialogTitle>
                                <div className="mt-2">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="postName" className="block text-sm font-medium leading-6 text-gray-900">
                                            Nombre <b className="text-red-700">*</b>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="postName"
                                                name="postName"
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => setPostName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="postDesc" className="block text-sm font-medium leading-6 text-gray-900">
                                            Descripcion <b className="text-red-700">*</b>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="postDesc"
                                                name="postDesc"
                                                type="text"
                                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => setPostDesc(e.target.value)}
                                            />
                                        </div>
                                        { isError &&
                                            <p className="text-red-700">Todos los campos son obligatorios</p>
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="submit"
                                onClick={onSavePost}
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Guardar
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}