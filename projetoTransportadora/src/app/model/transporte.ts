import { Evento } from './evento';
import { Funcionario } from './funcionario';

export class Transporte {
    constructor(
        public id: number, 
        public modelo: string, 
        public placa: string, 
        public consumoTransporte: number, 
        public funcionario: Funcionario
    ){}
}
