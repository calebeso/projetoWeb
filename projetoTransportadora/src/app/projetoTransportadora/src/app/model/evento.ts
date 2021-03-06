import { Time } from "@angular/common";
import { Status } from './situacao-evento';
import { Transporte } from './transporte';
import { Funcionario } from './funcionario';

export class Evento {
    constructor(
        public id: number,
        public cidadeDestino: string,
        public dataSaida: Date,
        public horaSaida: Time,
        public km: string, 
        public nome: string, 
        public status:  Status,
        public transporte: Transporte,
        public funcionario: Funcionario
    ) {  }
}