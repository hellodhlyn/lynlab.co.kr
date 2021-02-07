import { signIn } from 'next-auth/client';

const Unauthorized = (): JSX.Element => (
  <div className="h-screen w-full flex justify-center items-center text-center">
    <div>
      <p className="text-9xl py-8"><i className="bi-x-octagon before:align-middle" /></p>
      <p className="text-4xl">Unauthorized</p>
      <p className="my-8">
        <span className="underline cursor-pointer" onClick={() => signIn('google')}>Sign In</span>&nbsp;
        to continue.
      </p>
    </div>
  </div>
);

export default Unauthorized;
