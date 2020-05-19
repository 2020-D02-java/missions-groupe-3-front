export class Nature {
  constructor (
    public id:number,
    public nom:string,
    public facturation:boolean,
    public tjm:string,
    public prime:boolean,
    public pourcentage:number,
    public plafond:number,
    public plafond_depassable:boolean,
    public dateDebut:Date,
    public dateFin:Date
  ){}
}
