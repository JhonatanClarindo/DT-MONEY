import {createContext, ReactNode, useEffect, useState} from 'react';
import { api } from '../services/api';

interface Transactions {
    id: number,
    title: string,
    amount: number,
    category: string,
    type: string,
    createAtDate: string
}

type TransactionInput = Omit<Transactions, 'id' | 'createAtDate'>;

interface TransactionProviderProps {
    children: ReactNode;
}

interface TransactionContextData {
    transactions: Transactions[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContextData>(
    {} as TransactionContextData
    );


export function TransactionsProvider({children} : TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transactions[]>([]);
   
    useEffect(() => {
        api.get('transactions')
          .then(response => setTransactions(response.data.transactions));
      }, []);

async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
        ...transactionInput,
        createAtDate: new Date(),
    })
    const { transaction } = response.data;

    setTransactions([
        ...transactions,
        transaction,
    ])
}

    return(
        <TransactionContext.Provider value={{ transactions, createTransaction }}>

            {children}

        </TransactionContext.Provider>
    )


}

