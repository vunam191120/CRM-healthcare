// import GoThreeBars from 'react-icons/go';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiUser, BiSupport, BiClinic } from 'react-icons/bi';
import { RiArticleLine } from 'react-icons/ri';
import { FaUserNurse } from 'react-icons/fa';
import {
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineMedicalServices,
} from 'react-icons/md';
import { GiPerson, GiMedicines } from 'react-icons/gi';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdOutlineDashboard />,
    roles: ['Admin', 'Sale', 'Back Officer', 'Marketing', 'Support'],
  },
  {
    title: 'Clinics',
    path: '/clinics',
    icon: <BiClinic />,
    roles: ['Admin', 'Sale', 'Back Officer', 'Marketing', 'Support'],
  },
  {
    title: 'Supports',
    path: '/supports',
    icon: <BiSupport />,
    roles: ['Admin', 'Support'],
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: <BiUser />,
    roles: ['Admin', 'Back Officer'],
  },
  {
    title: 'Doctors',
    path: '/doctors',
    icon: <FaUserNurse />,
    roles: ['Admin', 'Back Officer'],
  },
  {
    title: 'Patients',
    path: '/patients',
    icon: <GiPerson />,
    roles: ['Admin', 'Support'],
  },
  {
    title: 'Products',
    path: '/products',
    icon: <GiMedicines />,
    roles: ['Admin', 'Marketing', 'Support', 'Sale'],
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: <MdOutlineCategory />,
    roles: ['Admin', 'Marketing', 'Support'],
  },
  {
    title: 'Services',
    path: '/services',
    icon: <MdOutlineMedicalServices />,
    roles: ['Admin', 'Marketing'],
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
    roles: ['Admin', 'Marketing'],
  },
  {
    title: 'Setting',
    path: '/setting',
    icon: <AiOutlineSetting />,
    roles: ['Admin', 'Sale', 'Back Officer', 'Marketing', 'Support'],
  },
];
