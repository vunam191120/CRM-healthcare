const doctorColumns = [
  {
    title: 'No',
    key: 'index',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Avatar',
    key: 'avatar',
    render: (text, record, index) => (
      <img src={`${record.avatar}`} alt="avatar user" className="user-avatar" />
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
    title: 'Date of Birth',
    dataIndex: 'date_of_birth',
    key: 'date_of_birth',
  },
];

export default doctorColumns;
