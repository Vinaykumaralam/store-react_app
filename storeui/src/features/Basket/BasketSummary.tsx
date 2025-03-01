import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useStoreContext } from "../../app/Context/StoreContext";
import { currencyFormat } from "../../app/utils/util";
import { UseAppSelector } from "../../app/store/configureStore";

export default function BasketSummary() {
    const {basket}=UseAppSelector(state=>state.basket);
    const subtotal = basket?.basketItems.reduce((sum,index)=>(sum+(index.price)*index.quantity),0) ?? 0;
    const deliveryFee = subtotal>10000 ? 0:500;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal +deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}