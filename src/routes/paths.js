// Accounts
export const PATH_ACCOUNTS = '/accounts';
export const PATH_ACCOUNTS_CREATE = '/accounts/create';
export const PATH_ACCOUNTS_UPDATE = '/accounts/update/:user_id';

// Doctors
export const PATH_DOCTORS = '/doctors';
export const PATH_DOCTORS_CREATE = '/doctors/create';
export const PATH_DOCTORS_UPDATE = '/doctors/update/:doctor_id';

// Supports
export const PATH_SUPPORTS = '/supports';
export const PATH_SUPPORTS_CREATE = '/supports/create';
export const PATH_SUPPORTS_UPDATE = '/supports/update/:support_id';

// Categories
export const PATH_CATEGORIES = '/categories';
export const PATH_CATEGORIES_CREATE = '/categories/create';
export const PATH_CATEGORIES_UPDATE = '/categories/update/:category_id';
export const PATH_CATEGORIES_DETAIL = '/categories/detail/:category_id';

// Services
export const PATH_SERVICES = '/services';
export const PATH_SERVICES_CREATE = '/services/create';
export const PATH_SERVICES_UPDATE = '/services/update/:service_id';
export const PATH_SERVICES_DETAIL = '/services/detail/:service_id';

// Articles
export const PATH_ARTICLES = '/articles';
export const PATH_ARTICLES_CREATE = '/articles/create';
export const PATH_ARTICLES_UPDATE = '/articles/update/:article_id';
export const PATH_ARTICLES_DETAIL = '/articles/detail/:article_id';

// Types
export const PATH_TYPES = '/articles/types';

// Tags
export const PATH_TAGS = '/articles/tags';

// Clinics
export const PATH_CLINICS = '/clinics';
export const PATH_CLINICS_CREATE = '/clinics/create';
export const PATH_CLINICS_UPDATE = '/clinics/update/:clinic_id';
export const PATH_CLINICS_DETAIL = '/clinics/detail/:clinic_id/*';
export const PATH_CLINICS_DETAIL_CLINIC = 'clinic';
export const PATH_CLINICS_DETAIL_APPOINTMENTS = 'appointments';
export const PATH_CLINICS_DETAIL_APPOINTMENTS_CREATE = 'appointments/create';
export const PATH_CLINICS_DETAIL_APPOINTMENTS_UPDATE =
  'appointments/update/:appointment_id';
export const PATH_CLINICS_DETAIL_CATEGORIES = 'categories';
export const PATH_CLINICS_DETAIL_DOCTORS = 'doctors';
export const PATH_CLINICS_DETAIL_PAYMENTS = 'payments';
export const PATH_CLINICS_DETAIL_PAYMENTS_DETAIL =
  'payments/detail/:payment_id';
export const PATH_CLINICS_DETAIL_PAYMENTS_DETAIL_CREATE =
  'payments/detail/:payment_id/detail/create';
export const PATH_CLINICS_DETAIL_PAYMENTS_DETAIL_UPDATE =
  'payments/detail/:payment_id/detail/update/:detail_id';
export const PATH_CLINICS_DETAIL_ROOMS = 'rooms';
export const PATH_CLINICS_DETAIL_ROOMS_CREATE = 'rooms/create';
export const PATH_CLINICS_DETAIL_ROOMS_UPDATE = 'rooms/update/:room_id';
export const PATH_CLINICS_DETAIL_BEDS = 'beds/:room_id';
export const PATH_CLINICS_DETAIL_SERVICES = 'services';
export const PATH_CLINICS_DETAIL_STAFFS = 'staffs';

// Patient
export const PATH_PATIENTS = '/patients';
export const PATH_PATIENTS_DETAIL = '/patients/detail/:patient_id';

// Product
export const PATH_PRODUCTS = '/products';
export const PATH_PRODUCTS_CREATE = '/products/create';
export const PATH_PRODUCTS_UPDATE = '/products/update/:product_id';
