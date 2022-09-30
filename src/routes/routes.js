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
  PATH_SERVICES_DETAIL,
  PATH_CLINICS,
  PATH_CLINICS_CREATE,
  PATH_CLINICS_UPDATE,
  PATH_CLINICS_DETAIL,
  PATH_CATEGORIES_DETAIL,
  PATH_ARTICLES,
  PATH_ARTICLES_CREATE,
  PATH_ARTICLES_UPDATE,
  PATH_TYPES,
  PATH_TAGS,
  PATH_CLINICS_DETAIL_APPOINTMENTS,
  PATH_CLINICS_DETAIL_CATEGORIES,
  PATH_CLINICS_DETAIL_DOCTORS,
  PATH_CLINICS_DETAIL_PAYMENTS,
  PATH_CLINICS_DETAIL_ROOMS,
  PATH_CLINICS_DETAIL_ROOMS_CREATE,
  PATH_CLINICS_DETAIL_ROOMS_UPDATE,
  PATH_CLINICS_DETAIL_BEDS,
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
import Articles from '../pages/articles';
import CreateArticle from '../pages/articles/create';
import UpdateArticle from '../pages/articles/update';
import Types from '../pages/articles/types';
import Tags from '../pages/articles/tags';
import Clinics from '../pages/clinics';
import CreateClinic from '../pages/clinics/create';
import UpdateClinic from '../pages/clinics/update';
import ClinicDetail from '../pages/clinics/detail';
import ClinicAppointments from '../modules/clinics/detail/appointments';
import ClinicCategories from '../modules/clinics/detail/categories';
import ClinicDoctors from '../modules/clinics/detail/doctors';
import ClinicPayments from '../modules/clinics/detail/payments';
import ClinicBeds from '../modules/clinics/detail/beds';
import Room from '../pages/rooms';
import CreateRoom from '../pages/rooms/create';
import UpdateRoom from '../pages/rooms/update';
import ClinicServices from '../modules/clinics/detail/services';
import ClinicStaffs from '../modules/clinics/detail/staffs';
import ClinicClinic from '../modules/clinics/detail/clinic';

// import NoMatch from '../components/NoMatch';

const appRoutes = [
  // Accounts
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
  // Categories
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
  // Services
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
    path: PATH_SERVICES_DETAIL,
    element: <ServiceDetail />,
    roles: ['Admin'],
  },
  // Articles
  {
    path: PATH_ARTICLES,
    element: <Articles />,
    roles: ['Admin'],
  },
  {
    path: PATH_ARTICLES_CREATE,
    element: <CreateArticle />,
    roles: ['Admin'],
  },
  {
    path: PATH_ARTICLES_UPDATE,
    element: <UpdateArticle />,
    roles: ['Admin'],
  },
  // Types
  {
    path: PATH_TYPES,
    element: <Types />,
    roles: ['Admin'],
  },
  // Tags
  {
    path: PATH_TAGS,
    element: <Tags />,
    roles: ['Admin'],
  },
  // Clinic
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
  // Clinic detail
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
        element: <Room />,
        roles: ['Admin'],
      },
      {
        path: PATH_CLINICS_DETAIL_ROOMS_CREATE,
        element: <CreateRoom />,
        roles: ['Admin'],
      },
      {
        path: PATH_CLINICS_DETAIL_ROOMS_UPDATE,
        element: <UpdateRoom />,
        roles: ['Admin'],
      },
      {
        path: PATH_CLINICS_DETAIL_BEDS,
        element: <ClinicBeds />,
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
