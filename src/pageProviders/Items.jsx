import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import ItemPage from 'pages/Items';

const Items = () => (
    <PageAccessValidator>
        <ItemPage/>
    </PageAccessValidator>
);

export default Items;