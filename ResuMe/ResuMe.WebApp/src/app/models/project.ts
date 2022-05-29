export class Project{
    id: number;
    projectName:string;
    client:string;
    dedication:string;
    description:string;
    businessLine:string;
    role:String;
    techStack:string;
    location:string;
    

    constructor(project?: Project){
        if(project){
            this.id=project.id;
            this.projectName=project.projectName;
            this.client=project.client;
            this.dedication=project.dedication;
            this.description=project.description;
            this.businessLine=project.businessLine;
            this.role=project.role;
            this.location=project.location;
            this.techStack = project.techStack;
        }
    }
}