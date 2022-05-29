export class Education{
    id:number;
    title:string;
    institution:string;
    period:string;

    constructor(education?: Education){
        if(education){
            this.id = education.id;
            this.title = education.title;
            this.institution = education.institution;
            this.period = education.period;
        }
    }
}