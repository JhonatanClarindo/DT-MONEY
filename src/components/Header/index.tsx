import { Container, Content } from "./styles";
import logo from '../../assets/logo.svg'
// import { useState } from "react";

interface HeaderProps{
    onOpenNewTransaction: () => void;
}
export function Header({onOpenNewTransaction} : HeaderProps){


    return(
        <Container>
            <Content>
            <img src={logo} alt="dt-money"/>
            <button type='button' onClick={onOpenNewTransaction}>
                Nova Transação
            </button>

            
            </Content>
        </Container>
    )
}