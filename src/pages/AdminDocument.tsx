import Divider from 'components/Divider';
import MenuAdmin from 'components/MenuAdmin';
import React from 'react';

const AdminDocument = () => {
  return (
    <div>
      <MenuAdmin adminTab={'document'} />
      <Divider />
      AdminDocument
    </div>
  );
};

export default AdminDocument;
