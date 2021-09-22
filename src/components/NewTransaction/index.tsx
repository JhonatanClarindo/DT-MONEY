import { FormEvent, useState, useContext } from 'react'
import Modal from 'react-modal'
import { TransactionContext } from '../../hooks/useTransactions'

import Close from '../../assets/close.svg'
import Entrada from '../../assets/entradas.svg'
import Saida from '../../assets/saidas.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styes'

interface NewTransactionProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionProps){
const {createTransaction} = useContext(TransactionContext);

   const [title, setTitle] = useState('');
   const [value, setValue] = useState(0);
   const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit')

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();


       await createTransaction({
            title,
            amount: value,
            category,
            type,
        })
        setType('deposit');
        setTitle('');
        setValue(0);
        setCategory('');
        onRequestClose();
    }

    return (
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
        >

            <button type="button" 
            onClick={onRequestClose} 
            className='react-modal-close'>

            <img src={Close} alt="Fechar Modal"/>

            </button>
        
        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar Transação</h2>

            <input 
            placeholder= "Título"
            type='text'
            value={title}
            onChange={event => setTitle(event.target.value)}
            />

            <input 
            type="number" 
            placeholder= "Valor"
            value={value}
            onChange={event => setValue(Number(event.target.value))}
            />

            <TransactionTypeContainer>

                <RadioBox 
                type="button"
                onClick={() => {setType('deposit')}}
                isActive={type === 'deposit'}
                activeColor='green'
                >
                    <img src={Entrada} alt="Entrada"/>
                <span>Entrada</span>
                </RadioBox>

                <RadioBox 
                type="button"
                onClick={() => {setType('withdraw')}}
                isActive={type === 'withdraw'}
                activeColor='red'
                >
                    <img src={Saida} alt="Saídas"/>
                <span>Saida</span>
                </RadioBox>

            </TransactionTypeContainer>

            <input 
            type='text'
            placeholder= "Categoria"
            value={category}
            onChange={event => setCategory(event.target.value)}
            />

            <button type="submit">Cadastrar</button>
        </Container>
       
    </Modal>
    )
}