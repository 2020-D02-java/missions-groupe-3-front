export class Nature {
  constructor (
    public nom:string,
    public facturation:boolean,
    public tjm:string,
    public prime:boolean,
    public primePourcentage:number,
    public plafond:number,
    public plafondDepassable:boolean,
    public dateDebut:Date,
    public dateFin:Date
  ){}
}
