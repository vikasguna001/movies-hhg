import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Language = React.lazy(() => import('./views/base/Language/Language'))
const SubCategoires = React.lazy(() => import('./views/base/subcategoires/subcategoires'))
const Home = React.lazy(() => import('./views/Home/Home'))
const Pdf = React.lazy(() => import('./views/Pdf/Pdf'))
const Contract = React.lazy(() => import('./views/Contract/Contract'))
const Categoires = React.lazy(() => import('./views/Categories/Categoires'))
const Video = React.lazy(() => import('./views/base/Video/View_Video'))
const AddVideo = React.lazy(() => import('./views/base/Video/AddVideo'))
const View_Contract = React.lazy(() => import('./views/View_Contract/View_Contract'))
// const Data = React.lazy(() => import('./views/View_Contract/Data'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/base/subcategoires', name: 'subcategoires', element: SubCategoires },
  { path: '/base/View_Video', name: 'Video', element: Video },
  { path: '/base/Add_Video', name: 'wizard', element: AddVideo },
  { path: '/base/Language', name: 'Language', element: Language },
  { path: '/base/Home', name: 'Home', element: Home },
  { path: '/base/Contract', name: 'Contract', element: Contract },
  { path: '/base/Pdf', name: 'Pdf', element: Pdf },
  { path: '/base/View_Contract', name: 'View_Contract', element: View_Contract },
  { path: '/base/Categoires', name: 'Categoires', element: Categoires },
  // { path: '/base/View_Contract/Data', name: 'Data', element: Data },

]
export default routes
