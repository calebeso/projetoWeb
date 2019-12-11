import { Time } from "@angular/common";

export class Evento {
    constructor(
        public id: number,
        public cidadeDestino: string,
        public dataChegada: Date,
        public dataSaida: Date,
        public horaSaida: Time,
        public km: string, 
        public nome: string, 
        public previsaoChegada: Time
    ) {  }
}