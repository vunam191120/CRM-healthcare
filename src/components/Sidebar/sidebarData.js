// import GoThreeBars from 'react-icons/go';
import { AiOutlineSetting, AiOutlineMedicineBox } from 'react-icons/ai';
import { BiUser, BiClinic } from 'react-icons/bi';
import {
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiArticleLine,
} from 'react-icons/ri';
import { HiOutlineDocumentText } from 'react-icons/hi';
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
    title: 'Services',
    path: '/services',
    icon: <MdOutlineMedicalServices />,
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: <BiUser />,
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: <MdOutlineCategory />,
  },
  {
    title: 'Clinics',
    path: '/clinics',
    icon: <BiClinic />,
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
