export const PATH_ACCOUNTS = '/accounts';
export const PATH_ACCOUNTS_CREATE = '/accounts/create';
export const PATH_ACCOUNTS_UPDATE = '/accounts/update/:email';

export const PATH_CATEGORIES = '/categories';
export const PATH_CATEGORIES_CREATE = '/categories/create';
export const PATH_CATEGORIES_UPDATE = '/categories/update/:category_id';
export const PATH_CATEGORIES_DETAIL = '/categories/detail/:category_id';

export const PATH_SERVICES = '/services';
export const PATH_SERVICES_CREATE = '/services/create';
export const PATH_SERVICES_UPDATE = '/services/update/:service_id';
export const PATH_SERVICE_DETAIL = '/services/detail/:service_id';

export const PATH_CLINICS = '/clinics';
export const PATH_CLINICS_CREATE = '/clinics/create';
export const PATH_CLINICS_UPDATE = '/clinics/update/:clinic_id';
export const PATH_CLINICS_DETAIL = '/clinics/detail/:clinic_id/*';
export const PATH_CLINICS_DETAIL_CLINIC = 'clinic';
export const PATH_CLINICS_DETAIL_APPOINTMENTS = 'appointments';
export const PATH_CLINICS_DETAIL_CATEGORIES = 'categories';
export const PATH_CLINICS_DETAIL_DOCTORS = 'doctors';
export const PATH_CLINICS_DETAIL_PAYMENTS = 'payments';
export const PATH_CLINICS_DETAIL_ROOMS = 'rooms';
export const PATH_CLINICS_DETAIL_ROOMS_CREATE = 'rooms/create';
export const PATH_CLINICS_DETAIL_ROOMS_UPDATE = 'rooms/update/:room_id';
export const PATH_CLINICS_DETAIL_BEDS = 'beds/:room_id';
export const PATH_CLINICS_DETAIL_SERVICES = 'services';
export const PATH_CLINICS_DETAIL_STAFFS = 'staffs';
