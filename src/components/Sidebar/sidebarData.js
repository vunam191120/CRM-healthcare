// import GoThreeBars from 'react-icons/go';
import { AiOutlineSetting, AiOutlineMedicineBox } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { HiOutlineDocumentText, HiOutlineCalendar } from 'react-icons/hi';
import { MdOutlineCategory, MdOutlineDashboard } from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdOutlineDashboard />,
  },
  {
    title: 'Appointments',
    path: '/appointments',
    icon: <HiOutlineCalendar />,
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: <BiUser />,
  },
  {
    title: 'Department',
    path: '/department',
    icon: <AiOutlineMedicineBox />,
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: <MdOutlineCategory />,
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <HiOutlineDocumentText />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Appointment',
        // path: '/reports/appoitment',
        path: '/',
      },
      {
        title: 'Income',
        // path: '/reports/income',
        path: '/',
      },
      {
        title: 'Invoice',
        // path: '/reports/invoice',
        path: '/',
      },
      {
        title: 'Users',
        // path: '/reports/users',
        path: '/',
      },
    ],
  },
  {
    title: 'Setting',
    path: '/setting',
    icon: <AiOutlineSetting />,
  },
];
