export class CareerPath{
    id:number;
    company:string;
    period:string;
    role:string;

    constructor(careerPath?: CareerPath){
        if(careerPath){
            this.id = careerPath.id;
            this.company = careerPath.company;
            this.period = careerPath.period;
            this.role = careerPath.role;
        }
    }
}