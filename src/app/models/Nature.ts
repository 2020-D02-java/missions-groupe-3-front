export class Nature {
  constructor (
    public nom:string,
    public facturation:boolean,
    public tjm:string,
    public prime:boolean,
    public primePourcentage:string,
    public plafond:string,
    public plafondDepassable:boolean,
    public dateDebut:Date,
    public dateFin:Date
  ){}
}
