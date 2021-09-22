import React, {useContext} from 'react';
import { Container } from "./styles";
import entradas from '../../assets/entradas.svg'
import saidas from '../../assets/saidas.svg'
import total from '../../assets/total.svg'
import { TransactionContext } from '../../hooks/useTransactions';

export function Summary(){
    const {transactions} = useContext(TransactionContext)

    const summary = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit'){
            acc.deposit += transaction.amount
            acc.total += transaction.amount
        } else {
            acc.withdraw += transaction.amount
            acc.total -= transaction.amount
        }

        return acc
    }, {
        deposit: 0,
        withdraw: 0,
        total: 0,
    })
    
    
    return(
       <Container> 
           <div>
            <header>
                <p>Entradas</p>
                <img src={entradas} alt="Entradas"/>
            </header>
            <strong>
            {new Intl.NumberFormat('PT-BR', {
                style: 'currency',
                currency: 'BRL'
                }).format(summary.deposit)}
            </strong>
           </div>
           <div>
            <header>
                <p>Saídas</p>
                <img src={saidas} alt="Saídas"/>
            </header>
            <strong>
            {new Intl.NumberFormat('PT-BR', {
                style: 'currency',
                currency: 'BRL'
                }).format(summary.withdraw)}
            </strong>
           </div>
           <div className='hightlight-background'>
            <header>
                <p>Total</p>
                <img src={total} alt="Total"/>
            </header>
            <strong> {new Intl.NumberFormat('PT-BR', {
                style: 'currency',
                currency: 'BRL'
                }).format(summary.total)}</strong>
           </div>
       </Container>
    )
}