// import GoThreeBars from 'react-icons/go';
import {
  AiFillHome,
  AiOutlineSetting,
  AiOutlineMedicineBox,
} from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { HiOutlineDocumentText, HiOutlineCalendar } from 'react-icons/hi';
import { MdOutlineCategory, MdOutlineDashboard } from 'react-icons/md';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <MdOutlineDashboard />,
  },
  {
    title: 'Appointments',
    path: '/',
    icon: <HiOutlineCalendar />,
  },
  {
    title: 'Users',
    path: '/users',
    icon: <BiUser />,
  },
  {
    title: 'Department',
    path: '/',
    icon: <AiOutlineMedicineBox />,
  },
  {
    title: 'Categories',
    path: '/',
    icon: <MdOutlineCategory />,
  },
  {
    title: 'Reports',
    path: '/',
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
    path: '/',
    icon: <AiOutlineSetting />,
  },
];
