export class Technology{
    id:number;
    description:string;
    level:number;

    constructor(technology?: Technology){
        if(technology){
            this.id=technology.id;
            this.description=technology.description;
            this.level=technology.level;
        }

    }
}