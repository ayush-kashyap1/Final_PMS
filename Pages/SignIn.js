'use client'
import dynamic from 'next/dynamic';

const SignInForm = dynamic(() => import('@/Pages/Components/SignInForm'), { ssr: false });

const SignIn = () => {
    return (
        <div>
            <SignInForm />
        </div>
    );
};

export default SignIn;