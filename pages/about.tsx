import resume from '../data/resume.json';
import ImageWithLoader from '../components/image-with-loader';

const ResumeProjectCard = (project) => (
  <div className="border border-gray-300 dark:border-gray-800"
       key={`project-${project.title}`}>
    <div className="w-full h-52 lg:h-40">
      <ImageWithLoader src={project.thumbnail_url || '/images/header.jpg'} alt={`${project.title} 프로젝트 썸네일`} />
    </div>
    <div className="p-4">
      <p className="font-bold">{project.title}</p>
      <p className="text-sm">{project.description}</p>
      <div className="mt-2" />
      {
        project.url
          ? <a href={project.url} target="_blank" rel="noreferrer">
              <p className="text-sm text-blue-700 dark:text-blue-500 hover:underline cursor-pointer">
                <i className="bi-link-45deg before:align-middle" /> {project.url.replace(/https:\/\//g, '')}
              </p>
            </a> : null
      }
      {
        project.github_repo
          ? <a href={`https://github.com/${project.github_repo}`} target="_blank" rel="noreferrer">
              <p className="text-sm text-blue-700 dark:text-blue-500 hover:underline cursor-pointer">
                <i className="bi-github before:align-middle" /> {project.github_repo}
              </p>
            </a> : null
      }
    </div>
  </div>
);

const ResumeTwoColumnTable = (item) => (
  <div className="md:flex pb-8" key={`item-${item.title}`}>
    <div className="mb-2 flex md:flex-col w-full md:w-1/4 items-end md:items-baseline">
      <p className="mr-1 text-xl">{item.title}</p>
      <p className="text-sm">{item.period}</p>
    </div>
    <div className="w-full md:w-3/4">
      <p>{item.description}</p>
      <div className="my-4 grid lg:grid-cols-3 gap-2">
        {item.projects?.map((project) => ResumeProjectCard(project))}
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="max-w-screen-xl mx-auto p-4 md:px-8 pb-16">
    <p className="py-8 text-4xl text-gray-900 dark:text-gray-000 font-bold">About Me</p>

    <p className="py-4 text-2xl text-gray-900 dark:text-gray-000 font-bold">도회린 (Hoerin Doh)</p>
    <div className="mb-8">
      <p>
        {(new Date().getFullYear()) - 2007}년 째 소프트웨어를 만들고 있는 개발 중독자입니다. 백엔드 개발, 클라우드, 데브옵스 등을 공부하고 있습니다.<br />
        현재는 핀테크 업체 두나무에서 백엔드 시스템을 개발, 운영하고 있습니다.
      </p>
      <div className="py-4 flex">
        <a href="https://twitter.com/hellodhlyn" target="_blank" rel="noreferrer">
          <div className="mr-1 flex h-10 w-10 bg-blue-500 rounded-full text-white justify-center items-center hover:opacity-50 transition-opacity">
            <i className="text-xl bi-twitter before:align-middle" />
          </div>
        </a>
        <a href="https://instagram.com/hellodhlyn" target="_blank" rel="noreferrer">
          <div className="mr-1 flex h-10 w-10 bg-pink-500 rounded-full text-white justify-center items-center hover:opacity-50 transition-opacity">
            <i className="text-xl bi-instagram before:align-middle" />
          </div>
        </a>
        <a href="https://github.com/hellodhlyn" target="_blank" rel="noreferrer">
          <div className="mr-1 flex h-10 w-10 bg-gray-900 rounded-full text-white justify-center items-center hover:opacity-50 transition-opacity">
            <i className="text-xl bi-github before:align-middle" />
          </div>
        </a>
        <a href="mailtio:lyn@lynlab.co.kr" target="_blank" rel="noreferrer">
          <div className="flex h-10 w-10 bg-red-800 rounded-full text-white justify-center items-center hover:opacity-50 transition-opacity">
            <i className="text-xl bi-envelope-fill before:align-middle" />
          </div>
        </a>
      </div>
    </div>

    <p className="py-4 text-2xl text-gray-900 dark:text-gray-000 font-bold">Experiences</p>
    <div className="mb-8">
      {resume.experiences.map((each) => ResumeTwoColumnTable(each))}
    </div>

    <p className="py-4 text-2xl text-gray-900 dark:text-gray-000 font-bold">Education</p>
    <div className="mb-8">
      {resume.education.map((each) => ResumeTwoColumnTable(each))}
    </div>

    <p className="py-4 text-2xl text-gray-900 dark:text-gray-000 font-bold">Projects</p>
    <div className="my-4 grid md:grid-cols-3 gap-2">
      {resume.projects.map((project) => ResumeProjectCard(project))}
    </div>
    <div className="py-4">
      <a href="https://github.com/hellodhlyn" target="_blank" rel="noreferrer">
        <span className="p-4 bg-gray-900 dark:bg-gray-000 text-gray-000 dark:text-gray-900 hover:underline">
          <i className="bi-github before:align-middle mr-1" /> GitHub에서 더 많은 프로젝트 보기 &gt;
        </span>
      </a>
    </div>
  </div>
);

export default About;
