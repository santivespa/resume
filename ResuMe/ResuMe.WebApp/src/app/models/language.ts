export class Language{
    id:number;
    languageName:string;
    nivel:number;

    constructor(language?: Language){
        if(language){
            this.id = language.id;
            this.languageName = language.languageName;
            this.nivel = language.nivel;
        }
    }
}