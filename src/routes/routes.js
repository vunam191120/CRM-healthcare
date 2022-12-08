import {
  PATH_ACCOUNTS,
  PATH_ACCOUNTS_CREATE,
  PATH_ACCOUNTS_UPDATE,
  PATH_DOCTORS,
  PATH_DOCTORS_CREATE,
  PATH_DOCTORS_UPDATE,
  PATH_SUPPORTS,
  PATH_SUPPORTS_CREATE,
  PATH_SUPPORTS_UPDATE,
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
  PATH_ARTICLES_DETAIL,
  PATH_TYPES,
  PATH_TAGS,
  PATH_CLINICS_DETAIL_APPOINTMENTS,
  PATH_CLINICS_DETAIL_APPOINTMENTS_CREATE,
  PATH_CLINICS_DETAIL_APPOINTMENTS_UPDATE,
  PATH_CLINICS_DETAIL_CATEGORIES,
  PATH_CLINICS_DETAIL_DOCTORS,
  PATH_CLINICS_DETAIL_PAYMENTS,
  PATH_CLINICS_DETAIL_PAYMENTS_CREATE,
  PATH_CLINICS_DETAIL_PAYMENTS_UPDATE,
  PATH_CLINICS_DETAIL_PAYMENTS_DETAIL,
  PATH_CLINICS_DETAIL_PAYMENTS_DETAIL_CREATE,
  PATH_CLINICS_DETAIL_PAYMENTS_DETAIL_UPDATE,
  PATH_CLINICS_DETAIL_ROOMS,
  PATH_CLINICS_DETAIL_ROOMS_CREATE,
  PATH_CLINICS_DETAIL_ROOMS_UPDATE,
  PATH_CLINICS_DETAIL_BEDS,
  PATH_CLINICS_DETAIL_SERVICES,
  PATH_CLINICS_DETAIL_STAFFS,
  PATH_CLINICS_DETAIL_CLINIC,
  PATH_PATIENTS_DETAIL,
  PATH_PATIENTS,
  PATH_PRODUCTS,
  PATH_PRODUCTS_CREATE,
  PATH_PRODUCTS_UPDATE,
  PATH_MEDICAL_RERCORD_DETAIL,
  PATH_CLINICS_DETAIL_MEDICAL_RECORDS,
  PATH_DASHBOARD,
} from './paths';
import Accounts from '../pages/accounts';
import CreateAccount from '../pages/accounts/create';
import UpdateAccount from '../pages/accounts/update';
import Doctors from '../pages/doctors';
import CreateDoctor from '../pages/doctors/create';
import UpdateDoctor from '../pages/doctors/update';
import Supports from '../pages/supports';
import CreateSupport from '../pages/supports/create';
import UpdateSupport from '../pages/supports/update';
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
import Appointment from '../pages/appointments';
import CreateAppointment from '../pages/appointments/create';
import UpdateAppointment from '../pages/appointments/update';
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
import ArticleDetail from '../modules/articles/detail';
import Patients from '../pages/patients';
import PatientDetailPage from '../pages/patients/detail';
import Products from '../pages/products';
import CreateProduct from '../pages/products/create';
import UpdateProduct from '../pages/products/update';
import PaymentDetail from '../modules/clinics/detail/payments/detail';
import CreatePaymentDetail from '../pages/clinics/detail/payments/detail/create';
import UpdatePaymentDetail from '../pages/clinics/detail/payments/detail/update';
import CreatePayment from '../pages/clinics/detail/payments/create';
import UpdatePayment from '../pages/clinics/detail/payments/update';
import MedicalRecordDetailPage from '../pages/medicalRecord';
import ClinicMedicalRecords from '../modules/clinics/detail/medicalRecords';
import DashboardPage from '../pages/dashboard';
import MedicalRecordDetail from '../modules/medicalRecord/detail';

const appRoutes = [
  // Dashboard
  {
    path: PATH_DASHBOARD,
    element: <DashboardPage />,
    roles: ['Admin', 'Sale', 'Back Officer', 'Marketing', 'Support'],
  },
  // Accounts
  {
    path: PATH_ACCOUNTS,
    element: <Accounts />,
    roles: ['Admin', 'Back Officer'],
  },
  {
    path: PATH_ACCOUNTS_CREATE,
    element: <CreateAccount />,
    roles: ['Admin', 'Back Officer'],
  },
  {
    path: PATH_ACCOUNTS_UPDATE,
    element: <UpdateAccount />,
    roles: ['Admin', 'Back Officer'],
  },
  // Doctors
  {
    path: PATH_DOCTORS,
    element: <Doctors />,
    roles: ['Admin', 'Back Officer'],
  },
  {
    path: PATH_DOCTORS_CREATE,
    element: <CreateDoctor />,
    roles: ['Admin', 'Back Officer'],
  },
  {
    path: PATH_DOCTORS_UPDATE,
    element: <UpdateDoctor />,
    roles: ['Admin', 'Back Officer'],
  },
  // Supports
  {
    path: PATH_SUPPORTS,
    element: <Supports />,
    roles: ['Admin', 'Support'],
  },
  {
    path: PATH_SUPPORTS_CREATE,
    element: <CreateSupport />,
    roles: ['Admin', 'Support'],
  },
  {
    path: PATH_SUPPORTS_UPDATE,
    element: <UpdateSupport />,
    roles: ['Admin', 'Support'],
  },
  // Categories
  {
    path: PATH_CATEGORIES,
    element: <Categories />,
    roles: ['Admin', 'Sale', 'Support'],
  },
  {
    path: PATH_CATEGORIES_CREATE,
    element: <CreateCategory />,
    roles: ['Admin', 'Sale'],
  },
  {
    path: PATH_CATEGORIES_UPDATE,
    element: <UpdateCategory />,
    roles: ['Admin', 'Sale'],
  },
  {
    path: PATH_CATEGORIES_DETAIL,
    element: <CategoryDetail />,
    roles: ['Admin', 'Sale'],
  },
  // Services
  {
    path: PATH_SERVICES,
    element: <Services />,
    roles: ['Admin', 'Sale'],
  },
  {
    path: PATH_SERVICES_CREATE,
    element: <CreateService />,
    roles: ['Admin', 'Sale'],
  },
  {
    path: PATH_SERVICES_UPDATE,
    element: <UpdateService />,
    roles: ['Admin', 'Sale'],
  },
  {
    path: PATH_SERVICES_DETAIL,
    element: <ServiceDetail />,
    roles: ['Admin', 'Sale'],
  },
  // Articles
  {
    path: PATH_ARTICLES,
    element: <Articles />,
    roles: ['Admin', 'Marketing'],
  },
  {
    path: PATH_ARTICLES_CREATE,
    element: <CreateArticle />,
    roles: ['Admin', 'Marketing'],
  },
  {
    path: PATH_ARTICLES_UPDATE,
    element: <UpdateArticle />,
    roles: ['Admin', 'Marketing'],
  },
  {
    path: PATH_ARTICLES_DETAIL,
    element: <ArticleDetail />,
    roles: ['Admin', 'Marketing'],
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
    roles: ['Admin', 'Back Officer', 'Sale', 'Support'],
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
  // Patient
  {
    path: PATH_PATIENTS,
    element: <Patients />,
    roles: ['Admin', 'Marketing', 'Support'],
  },
  {
    path: PATH_PATIENTS_DETAIL,
    element: <PatientDetailPage />,
    roles: ['Admin', 'Marketing', 'Support'],
  },
  // Product
  {
    path: PATH_PRODUCTS,
    element: <Products />,
    roles: ['Admin', 'Sale', 'Support'],
  },
  {
    path: PATH_PRODUCTS_CREATE,
    element: <CreateProduct />,
    roles: ['Admin', 'Sale'],
  },
  {
    path: PATH_PRODUCTS_UPDATE,
    element: <UpdateProduct />,
    roles: ['Admin', 'Sale'],
  },
  // Medical Record
  {
    path: PATH_MEDICAL_RERCORD_DETAIL,
    element: <MedicalRecordDetailPage />,
    roles: ['Admin', 'Support'],
  },
  // Clinic detail
  {
    path: PATH_CLINICS_DETAIL,
    element: <ClinicDetail />,
    roles: ['Admin', 'Back Officer', 'Sale', 'Support'],
    subnavs: [
      {
        path: PATH_CLINICS_DETAIL_CLINIC,
        element: <ClinicClinic />,
        roles: ['Admin', 'Back Officer', 'Sale', 'Support'],
      },
      {
        path: PATH_CLINICS_DETAIL_APPOINTMENTS,
        element: <Appointment />,
        roles: ['Admin', 'Sale', 'Support'],
      },
      {
        path: PATH_CLINICS_DETAIL_APPOINTMENTS_CREATE,
        element: <CreateAppointment />,
        roles: ['Admin', 'Sale', 'Support'],
      },
      {
        path: PATH_CLINICS_DETAIL_APPOINTMENTS_UPDATE,
        element: <UpdateAppointment />,
        roles: ['Admin', 'Sale', 'Support'],
      },
      {
        path: PATH_CLINICS_DETAIL_CATEGORIES,
        element: <ClinicCategories />,
        roles: ['Admin', 'Back Officer', 'Sale'],
      },
      {
        path: PATH_CLINICS_DETAIL_DOCTORS,
        element: <ClinicDoctors />,
        roles: ['Admin', 'Back Officer'],
      },
      {
        path: PATH_CLINICS_DETAIL_PAYMENTS,
        element: <ClinicPayments />,
        roles: ['Admin', 'Sale', 'Support', 'Marketing'],
      },
      {
        path: PATH_CLINICS_DETAIL_PAYMENTS_CREATE,
        element: <CreatePayment />,
        roles: ['Admin', 'Sale', 'Support', 'Marketing'],
      },
      {
        path: PATH_CLINICS_DETAIL_PAYMENTS_UPDATE,
        element: <UpdatePayment />,
        roles: ['Admin', 'Sale', 'Support', 'Marketing'],
      },
      {
        path: PATH_CLINICS_DETAIL_PAYMENTS_DETAIL,
        element: <PaymentDetail />,
        roles: ['Admin', 'Sale', 'Support'],
      },
      {
        path: PATH_CLINICS_DETAIL_PAYMENTS_DETAIL_CREATE,
        element: <CreatePaymentDetail />,
        roles: ['Admin', 'Sale', 'Support'],
      },
      {
        path: PATH_CLINICS_DETAIL_PAYMENTS_DETAIL_UPDATE,
        element: <UpdatePaymentDetail />,
        roles: ['Admin', 'Salew', 'Support'],
      },
      {
        path: PATH_CLINICS_DETAIL_ROOMS,
        element: <Room />,
        roles: ['Admin', 'Back Officer'],
      },
      {
        path: PATH_CLINICS_DETAIL_ROOMS_CREATE,
        element: <CreateRoom />,
        roles: ['Admin', 'Back Officer'],
      },
      {
        path: PATH_CLINICS_DETAIL_ROOMS_UPDATE,
        element: <UpdateRoom />,
        roles: ['Admin', 'Back Officer'],
      },
      {
        path: PATH_CLINICS_DETAIL_BEDS,
        element: <ClinicBeds />,
        roles: ['Admin', 'Back Officer'],
      },
      {
        path: PATH_CLINICS_DETAIL_SERVICES,
        element: <ClinicServices />,
        roles: ['Admin', 'Back Officer', 'Sale'],
      },
      {
        path: PATH_CLINICS_DETAIL_STAFFS,
        element: <ClinicStaffs />,
        roles: ['Admin', 'Back Officer'],
      },
      {
        path: PATH_CLINICS_DETAIL_MEDICAL_RECORDS,
        element: <ClinicMedicalRecords />,
        roles: ['Admin', 'Sale', 'Back Officer', 'Support'],
      },
    ],
  },
];

export default appRoutes;
