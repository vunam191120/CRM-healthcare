// import GoThreeBars from 'react-icons/go';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiUser, BiClinic } from 'react-icons/bi';
import { RiArticleLine } from 'react-icons/ri';
import { FaUserNurse } from 'react-icons/fa';
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineMedicalServices,
} from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdOutlineDashboard />,
  },
  {
    title: 'Clinics',
    path: '/clinics',
    icon: <BiClinic />,
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: <BiUser />,
  },
  {
    title: 'Doctors',
    path: '/doctors',
    icon: <FaUserNurse />,
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: <MdOutlineCategory />,
  },
  {
    title: 'Services',
    path: '/services',
    icon: <MdOutlineMedicalServices />,
  },
  // {
  //   title: 'Reports',
  //   path: '/reports',
  //   icon: <HiOutlineDocumentText />,
  //   iconClosed: <RiArrowDownSFill />,
  //   iconOpened: <RiArrowUpSFill />,
  //   subNav: [
  //     {
  //       title: 'Appointment',
  //       // path: '/reports/appoitment',
  //       path: '/',
  //     },
  //     {
  //       title: 'Income',
  //       // path: '/reports/income',
  //       path: '/',
  //     },
  //     {
  //       title: 'Invoice',
  //       // path: '/reports/invoice',
  //       path: '/',
  //     },
  //     {
  //       title: 'Users',
  //       // path: '/reports/users',
  //       path: '/',
  //     },
  //   ],
  // },
  {
    title: 'Articles',
    path: '/articles',
    icon: <RiArticleLine />,
  },
  {
    title: 'Setting',
    path: '/setting',
    icon: <AiOutlineSetting />,
  },
];
