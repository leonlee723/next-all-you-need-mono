"use client"

import React, { useEffect, useState } from 'react';
import LandingIntro from '@/features/login/landing-intro';
import InputText from '@/components/input/input-text';
import ErrorText from '@/components/typography/error-text';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthProvider';
import { useUserProfileStore } from '@/stores';

interface LoginObj {
  password: string;
  emailId: string;
}


function Login(): JSX.Element {

  // const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showLoginPage, setShowLoginPage] = useState<boolean>(true);
  const [isOtpSent, setIsOtpSent] = useState(false)
  const { login } = useAuth()

  const { loginService, userProfile, err } = useUserProfileStore()

  const [loginObj, setLoginObj] = useState<LoginObj>({
    password: '',
    emailId: '',
  });

  useEffect(() => {
    if(err.message!= ""){
      setLoading(false);
      setErrorMessage(err.message);
    }
    if(userProfile.name!= ""){
      console.log(userProfile.name)
      loginUser({token : "asdsadsddsad$$token"})
    }
  }
  , [userProfile,err]);
  

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setErrorMessage('');
    if(loading)return;
    if(loginObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
    if(loginObj.password.trim() === "")return setErrorMessage("Password is required! (use any value)")
    else {  
      setLoading(true);
      loginService(loginObj.emailId.trim(), loginObj.password.trim());
    }
  };

  const loginUser = async({ token }: { token: string;}) => {
    await login(token)
  };

  const updateFormValue = (updateType: string, value: string): void => {
    setErrorMessage('');
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div>
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
              <InputText type="emailId" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/>

              <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue}/>
                
              </div>
              
              <div className='mt-8'>
                  {errorMessage && <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>}
                  <button type="submit" className={`btn mt-2 w-full btn-primary`}>
                    {loading && <span className="loading loading-spinner"></span>}login
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
