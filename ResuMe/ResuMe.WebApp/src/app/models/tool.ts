export class Tool{
    id:number;
    description:String;
    level:number;
    constructor(tool?: Tool){
        if(tool){
            this.id = tool.id;
            this.description=tool.description;
            this.level=tool.level;
        }
    }
}