import Link from 'next/link';
import contact from '../data/contact.json';

const Index = () => (
  <div className="h-screen w-screen text-gray-300">
    <div className="absolute h-full w-full bg-black">
      <img className="w-full h-full object-cover opacity-40" src="https://storage.lynlab.co.kr/20191103-bg-q50.jpg" />
    </div>

    <div className="absolute h-full w-full px-4 flex items-center justify-center tracking-tight">
      <div>
        <img className="h-32 w-32 mx-auto" src="/images/logo-white.png" alt="LYnLab Logo" />
        <p className="py-2 text-4xl md:text-6xl">Hoerin Doh <span className="text-2xl md:text-4xl">(도회린)</span></p>
        <p className="py-2 md:text-lg">
          Backend Developer at <a href="https://dunamu.com" target="_blank" className="cursor-pointer underline hover:opacity-50 transition-opacity">Dunamu Inc.</a><br/>
          Dept. of Computer Science, Yonsei Univ.
        </p>

        <div className="py-4 flex gap-1 justify-center">
          {
            contact.map((item) => (
              <a href={item.link} target="_blank" key={`contact-${item.name}`}>
                <div className="flex p-1 text-white justify-center items-center hover:opacity-50 transition-opacity">
                  <i className={`text-xl bi-${item.icon} before:align-middle`}/>
                </div>
              </a>
            ))
          }
        </div>
      </div>
    </div>

    <div className="absolute h-24 w-full flex items-center justify-center text-lg gap-4">
      <Link href="/blog">
        <p className="cursor-pointer hover:underline hover:opacity-50 transition-opacity">
          Blog
        </p>
      </Link>
      <Link href="/resume">
        <p className="cursor-pointer hover:underline hover:opacity-50 transition-opacity">
          Resume
        </p>
      </Link>
    </div>
  </div>
);

export default Index;
