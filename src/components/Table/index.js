import React from 'react';

import Spinner from '../Spinner';

export default function Table({
  loading,
  head,
  data,
  renderRows,
  onClickDeleteBtn,
  title,
  ...props
}) {
  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td>
            {/* <Spinner /> */}
            <p>Loading data ...</p>
          </td>
        </tr>
      );
    }
    if (data.lenght === 0) {
      return (
        <tr>
          <td>No data</td>
        </tr>
      );
    }
    return data.map((item, index) => {
      renderRows(item, index, onClickDeleteBtn);
    });
  };

  return (
    <div className="table-container">
      <h4 className="table-title">{title}</h4>
      <table className="table-content">
        {head}
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
}

Table.defaultProps = {
  loading: false,
};
