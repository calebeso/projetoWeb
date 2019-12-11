import { Evento } from './evento';


export class Funcionario {
    constructor(
        public id: number,
        public nome: string,
        public cpf: string, 
        public cnh: string,
        public dataNascimento: Date,
        public eventos : Evento[]
    ){}
}
