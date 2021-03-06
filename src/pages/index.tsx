import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { AiFillGithub, AiFillGoogleCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default function Example() {
  function handleSignIn() {
    signIn("github");
  }

  function handleGoogleSignIn() {
    signIn("google");
  }

  function handleFacebookSignIn() {
    signIn("facebook");
  }

  return (
    <>
      <div className='h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>

            <p className='mt-2 text-center text-sm text-gray-600'></p>
          </div>
          <form className='mt-8 space-y-6' action='#' method='POST'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Email address'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                  placeholder='Password'
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-gray-900'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Sign in
              </button>
              <p className='text-center pt-5 pb-5 font-bold'>Or Sign In With</p>
              <div className='github md-cols-6 pt-5 justify-center flex space-x-12'>
                <button onClick={handleSignIn}>
                  <AiFillGithub size={40} />
                </button>
                <button onClick={handleGoogleSignIn}>
                  <AiFillGoogleCircle size={40} />
                </button>
                <button onClick={handleFacebookSignIn}>
                  <BsFacebook size={36} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
