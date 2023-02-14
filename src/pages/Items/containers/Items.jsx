import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import itemsActions from '../actions/items'
import Button from '@mui/material/Button';
import {NavLink, useHistory} from 'react-router-dom';
import config from '../../../config/configExample';
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";

const getClasses = makeStyles(() => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

function Items() {
    const history = useHistory();
    const items = useSelector(({items}) => items);
    const dispatch = useDispatch();
    const classes = getClasses();

    useEffect(() => {
        dispatch(itemsActions.fetchItems())
    }, []);

    const deleteItem = (e) => {
        const id = e.currentTarget.id;
        if (window.confirm("Are you sure that you want delete this item?")) {
            fetch(config.BASE_URL + "/item/delete" + id, {method: 'DELETE'})
                .then(() => {
                    dispatch(itemsActions.fetchItems())
                })
        }
    }

    const handleOnClick = (e) => {
        const id = e.currentTarget.id;
        history.push('/editItem/' + id);
    }


    return (
        <div className={classes.main}>
            <div>
                <NavLink to="/">Back</NavLink>
            </div>
            <div>
                <NavLink to="/editItem">Edit Item</NavLink>
            </div>
            <br/>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <caption>Item table</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell><i>Item name</i></TableCell>
                                <TableCell><i>Customer name</i></TableCell>
                                <TableCell><i>Price</i></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                items.list.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell>{row.item_name}</TableCell>
                                        <TableCell>{row.customer_name}</TableCell>
                                        <TableCell>{row.price}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined" id={row.id}
                                                    onClick={handleOnClick}>Edit</Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outlined" id={row.id} color="error"
                                                    onClick={deleteItem}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default Items