import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { RootState } from '@/Redux/store';

export default function Profile() {
  const user = useAppSelector((state: RootState) => state.user.user);
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 transition-all duration-300 ease-in-out hover:shadow-lg">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">User Profile</div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{user?.username}</h1>
          <p className="mt-2 text-slate-500">{user?.role}</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              {user?.email}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              {user?.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}