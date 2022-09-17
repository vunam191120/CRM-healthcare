import checkRole from '../../../helpers/checkRole';

const usersColumn = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last name',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Role',
    key: 'role',
    render: (text, record, index) => checkRole(record.role_id),
  },
  {
    title: 'Date of Birth',
    dataIndex: 'dateOfBirth',
    key: 'dateOfBirth',
  },
  // {
  //   title: 'Experiences',
  //   dataIndex: 'experiences',
  //   key: 'experiences',
  // },
];

for (let index in usersColumn) {
  usersColumn[index].className = 'column--width';
}

export default usersColumn;
