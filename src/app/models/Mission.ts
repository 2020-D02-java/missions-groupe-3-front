import { Nature } from './NatureDto';

export class Mission {
    constructor(public id: number, public collegue_id: number, public date_debut:Date, public date_fin:Date, public nature: Nature, public ville_depart:string, public ville_arrive:string, public transport:string, public statut:string, public collegue_email: string){}

}