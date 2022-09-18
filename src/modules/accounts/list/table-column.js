import checkRole from '../../../helpers/checkRole';

const usersColumn = [
  {
    title: 'Avatar',
    key: 'avatar',
    render: (text, record, index) => (
      <img
        src={`http://159.223.73.5:3002/${record.avatar}`}
        alt="avatar user"
        className="user-avatar"
      />
    ),
    width: 100,
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
  if (index !== 0) {
    usersColumn[index].className = 'column--width';
  }
}

export default usersColumn;
