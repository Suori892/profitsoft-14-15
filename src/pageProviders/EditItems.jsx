import React from 'react';
import PageAccessValidator from "../components/PageAccessValidator";
import EditItemsPage from 'pages/EditItems';

const EditItems = () => (
    <PageAccessValidator>
        <EditItemsPage/>
    </PageAccessValidator>
);

export default EditItems;