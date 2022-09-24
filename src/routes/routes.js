import {
  PATH_ACCOUNTS,
  PATH_ACCOUNTS_CREATE,
  PATH_ACCOUNTS_UPDATE,
  PATH_CATEGORIES,
  PATH_CATEGORIES_CREATE,
  PATH_CATEGORIES_UPDATE,
  PATH_SERVICES,
  PATH_SERVICES_CREATE,
  PATH_SERVICES_UPDATE,
  PATH_SERVICE_DETAIL,
  PATH_CLINICS,
  PATH_CLINICS_CREATE,
  PATH_CLINICS_UPDATE,
  PATH_CLINICS_DETAIL,
  PATH_CATEGORIES_DETAIL,
  PATH_CLINICS_DETAIL_APPOINTMENTS,
  PATH_CLINICS_DETAIL_CATEGORIES,
  PATH_CLINICS_DETAIL_DOCTORS,
  PATH_CLINICS_DETAIL_PAYMENTS,
  PATH_CLINICS_DETAIL_ROOMS,
  PATH_CLINICS_DETAIL_SERVICES,
  PATH_CLINICS_DETAIL_STAFFS,
  PATH_CLINICS_DETAIL_CLINIC,
} from './paths';
import Accounts from '../pages/accounts';
import CreateAccount from '../pages/accounts/create';
import UpdateAccount from '../pages/accounts/update';
import Categories from '../pages/categories';
import CreateCategory from '../pages/categories/create';
import UpdateCategory from '../pages/categories/update';
import CategoryDetail from '../pages/categories/detail';
import Services from '../pages/services';
import CreateService from '../pages/services/create';
import UpdateService from '../pages/services/update';
import ServiceDetail from '../pages/services/detail';
import Clinics from '../pages/clinics';
import CreateClinic from '../pages/clinics/create';
import UpdateClinic from '../pages/clinics/update';
import ClinicDetail from '../pages/clinics/detail';
import ClinicAppointments from '../modules/clinics/detail/appointments';
import ClinicCategories from '../modules/clinics/detail/categories';
import ClinicDoctors from '../modules/clinics/detail/doctors';
import ClinicPayments from '../modules/clinics/detail/payments';
import ClinicRooms from '../modules/clinics/detail/rooms';
import ClinicServices from '../modules/clinics/detail/services';
import ClinicStaffs from '../modules/clinics/detail/staffs';
import ClinicClinic from '../modules/clinics/detail/clinic';

// import NoMatch from '../components/NoMatch';

const appRoutes = [
  {
    path: PATH_ACCOUNTS,
    element: <Accounts />,
    roles: ['Admin'],
  },
  {
    path: PATH_ACCOUNTS_CREATE,
    element: <CreateAccount />,
    roles: ['Admin'],
  },
  {
    path: PATH_ACCOUNTS_UPDATE,
    element: <UpdateAccount />,
    roles: ['Admin'],
  },
  {
    path: PATH_CATEGORIES,
    element: <Categories />,
    roles: ['Admin'],
  },
  {
    path: PATH_CATEGORIES_CREATE,
    element: <CreateCategory />,
    roles: ['Admin'],
  },
  {
    path: PATH_CATEGORIES_UPDATE,
    element: <UpdateCategory />,
    roles: ['Admin'],
  },
  {
    path: PATH_CATEGORIES_DETAIL,
    element: <CategoryDetail />,
  },
  {
    path: PATH_SERVICES,
    element: <Services />,
    roles: ['Admin'],
  },
  {
    path: PATH_SERVICES_CREATE,
    element: <CreateService />,
    roles: ['Admin'],
  },
  {
    path: PATH_SERVICES_UPDATE,
    element: <UpdateService />,
    roles: ['Admin'],
  },
  {
    path: PATH_SERVICE_DETAIL,
    element: <ServiceDetail />,
    roles: ['Admin'],
  },
  {
    path: PATH_CLINICS,
    element: <Clinics />,
    roles: ['Admin'],
  },
  {
    path: PATH_CLINICS_CREATE,
    element: <CreateClinic />,
    roles: ['Admin'],
  },
  {
    path: PATH_CLINICS_UPDATE,
    element: <UpdateClinic />,
    roles: ['Admin'],
  },
  {
    path: PATH_CLINICS_DETAIL,
    element: <ClinicDetail />,
    roles: ['Admin'],
    subnavs: [
      {
        path: PATH_CLINICS_DETAIL_CLINIC,
        element: <ClinicClinic />,
        roles: ['Admin'],
      },
      {
        path: PATH_CLINICS_DETAIL_APPOINTMENTS,
        element: <ClinicAppointments />,
        roles: ['Admin'],
      },
      {
        path: PATH_CLINICS_DETAIL_CATEGORIES,
        element: <ClinicCategories />,
        roles: ['Admin'],
      },
      {
        path: PATH_CLINICS_DETAIL_DOCTORS,
        element: <ClinicDoctors />,
        roles: ['Admin'],
      },
      {
        path: PATH_CLINICS_DETAIL_PAYMENTS,
        element: <ClinicPayments />,
        roles: ['Admin'],
      },
      {
        path: PATH_CLINICS_DETAIL_ROOMS,
        element: <ClinicRooms />,
        roles: ['Admin'],
      },
      {
        path: PATH_CLINICS_DETAIL_SERVICES,
        element: <ClinicServices />,
        roles: ['Admin'],
      },
      {
        path: PATH_CLINICS_DETAIL_STAFFS,
        element: <ClinicStaffs />,
        roles: ['Admin'],
      },
    ],
  },
];

export default appRoutes;
