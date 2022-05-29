export class Methodology{
    id:number;
    description:String;
    level:number;
    constructor(methodology?: Methodology){
        if(methodology){
            this.id = methodology.id;
            this.description=methodology.description;
            this.level=methodology.level;
        }
    }
}