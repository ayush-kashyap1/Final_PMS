'use client'
import dynamic from 'next/dynamic';
const SignUpForm = dynamic(() => import('@/Pages/Components/SignUpForm'), { ssr: false });

const SignUp = () => {
    return (
        <div>
            <SignUpForm />
        </div>
    );
};

export default SignUp;