import { signOut, useSession } from 'next-auth/client';
import Unauthorized from '../../components/unauthorized';

export default function Admin(): JSX.Element {
  const [session] = useSession();
  if (!session) {
    return Unauthorized();
  }

  return (
    <div className="pt-20">
      <p className="cursor-pointer" onClick={() => signOut()}>Sign Out</p>
    </div>
  );
}
