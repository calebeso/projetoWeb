import { Evento } from './evento';
import { Funcionario } from './funcionario';

//Modelo de transporte//
export class Transporte {
    constructor(
        public id: number, 
        public modelo: string, 
        public placa: string, 
        public consumoTransporte: number, 
        public eventos : Evento[]
    ){}
}
