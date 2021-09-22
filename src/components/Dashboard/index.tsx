import { Summary } from "../Summary";
import { TransationTable } from "../TransactionTable";
import { Container } from "./styles";

export function Dashboard(){
    return(
        <Container>
            <Summary />
            <TransationTable />
        </Container>
    )
}