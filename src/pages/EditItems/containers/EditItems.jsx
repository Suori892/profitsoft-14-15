import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import config from '../../../config/configExample';

const getClasses = makeStyles(() => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
}));

function EditItems() {
    const [item_name, setItemName] = useState('');
    const [customer_name, setCustomerName] = useState('');
    const [price, setPrice] = useState('');
    let params = useParams();
    let history = useHistory();
    const classes = getClasses();

    useEffect(() => {
        if (params.id) {
            getItemById(params.id)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then(item => {
                                setItemName(item.item_name);
                                setCustomerName(item.customer_name);
                                setPrice(item.price)
                            })
                    } else {
                        console.log('Something going wrong' + response.status)
                    }
                })
        }
    }, []);

    const getItemById = (id) => {
        const url = config.BASE_URL + "/item/" + id;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        };
        return fetch(url, options)
    }

    const postItem = () => {
        const requestBody = {
            item_name: item_name,
            customer_name: customer_name,
            price: price
        }
        const url = config.BASE_URL + "/item";
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestBody),
        };
        return fetch(url, options)
    }

    const editItem = () => {
        const requestBody = {
            id: params.id,
            item_name: item_name,
            customer_name: customer_name,
            price: price
        }
        const url = config.BASE_URL + "/item/edit";
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestBody),
        };
        return fetch(url, options);
    }

    const postData = (e) => {
        e.preventDefault()

        if (params.id) {
            editItem()
                .then(response => {
                    if (response.ok) {
                        console.log("Item was edited");
                        history.push('/items');
                    } else {
                        console.log('Operation failed ' + response.status);
                    }
                })
        } else {
            postItem()
                .then(response => {
                    if (response.ok) {
                        console.log("Item was added");
                        history.push('/items');
                    } else {
                        console.log('Operation failed ' + response.status);
                    }
                })
        }
    }

    return (
        <div>
            <br/>
            <form className={classes.main}>
                <TextField label="item_name" name="item_name" onChange={(e) => setItemName(e.target.value)} value={item_name}/>
                <br/>
                <TextField label="customer_name" name="customer_name" onChange={(e) => setCustomerName(e.target.value)}
                           value={customer_name}/>
                <br/>
                <TextField label="price" name="price" onChange={(e) => setPrice(e.target.value)}
                           value={price}/>
                <br/>
                <Button onClick={postData} variant="contained" type="submit">{params.id ? "EDIT" : "ADD"}</Button>
                <br/>
                <Button onClick={() => (history.push('/items'))} variant="contained" color="error">Cancel</Button>
            </form>
        </div>
    )
}

export default EditItems;