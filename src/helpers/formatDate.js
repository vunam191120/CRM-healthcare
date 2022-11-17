import moment from 'moment';

export const formatDateAndTime = (date) => {
  return `${moment(date).format('DD-MM-YYYY')} - ${moment(date).format('LT')}`;
};
