"use client";

import {signIn} from 'next-auth/react';

import axios from 'axios';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Input from '../inputs/Input';
import Heading from '../Heading';
import Button from '../Button';
import {FcGoogle} from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';

function LoginModal() {

    const router = useRouter();

    const loginModal = useLoginModal();

    const [ isLoading, setisLoading] = useState(false);  

    const {register, handleSubmit, formState:{
        errors
    }} = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data)=>{
      setisLoading(true);

      signIn('credentials',{
        ...data,
        redirect: false
      })
      .then((callback)=>{
        setisLoading(false);
        if(callback?.ok){
          router.refresh();
          loginModal.onClose();
        }
        if(callback?.error){
          console.log('Error function');
        }
      })
    }

    const body=(
      <div className='flex flex-col gap-4'>
        <Heading title='Welcome back' subtitle='Login to your account'/>
        <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
        <Input id='password' label='Password' disabled={isLoading} register={register} errors={errors} required/>
      </div>
    )
    const footerContent = (
      <div className='flex flex-col gap-4 mt-3'>
        <hr/>
        <Button onClick={()=>{}} outline label='Continue with Google' icon={FcGoogle}/>
        <Button onClick={()=>{}} outline label='Continue with Github' icon={AiFillGithub}/>
        <div className='text-neutral-500 text-center mt-4 font-light'>
          <div className='flex flex-row items-center gap-2'>
            <div>
              Already have an account?
            </div>
            <div className='text-neutral-800 cursor-pointer hover:underline'>Login</div>
          </div>
        </div>
      </div>
    )
    return (
      //after loading i would like to set into false
    <Modal 
    disabled={isLoading} 
    isOpen={loginModal.isOpen} 
    title='Register' 
    actionLabel='Submit'
    secondaryActionLabel='Second function'
    //registerModal.onClose is a function
    onClose={loginModal.onClose} 
    onSubmit={handleSubmit(onSubmit)} 
    body={body}
    footer={footerContent}/>
  )
}

export default LoginModal
