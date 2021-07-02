import {  InMemoryDbService } from "angular-in-memory-web-api";
import { Contato } from "./service/contato.model";


export class InMemoryDatabase implements InMemoryDbService {
    createDb(){
        const contatos: Contato[] = [
            { id: 0 },
        ];

        return { contatos }
    }
}
