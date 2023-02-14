const receiveItems = items => ({
   items,
   type: 'RECEIVE_ITEMS'
});

const requestItems = () => ({
    type: 'REQUEST_ITEMS'
});

const receiveItemsFail = () => ({
    type: 'RECEIVE_ITEMS_FAIL'
});

const getItems = () => {
    const url = "http://localhost:8080/item";
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    };
    return fetch(url, options);
}

const fetchItems = () => (dispatch) => {
    dispatch(requestItems());
    return getItems()
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(items => dispatch(receiveItems(items)))
                    .catch(() => dispatch(receiveItemsFail()))
            } else {
                console.log('Something going' + response.status)
            }
        })
};

export default {fetchItems};
