import { Injectable } from '@angular/core';
import { CustomHttpService } from './custom-http.service';
import { Language } from '../models/language';
import { CareerPath } from '../models/careerPath';
import { Technology } from '../models/technology';
import { Methodology } from '../models/methodology';
import { Tool } from '../models/tool';
import { Project } from '../models/project';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  controller='curriculum';

  constructor(private http: CustomHttpService) { }


  addLanguage(language: Language){
    return this.http.post(`${this.controller}/add-language`,language);
  }

  editLanguage(language: Language){
    return this.http.put(`${this.controller}/edit-language`,language);
  }

  deleteLanguage(languageID: number){
    return this.http.delete(`${this.controller}/delete-language/${languageID}`);
  }

  addCareerPath(careerPath: CareerPath){
    return this.http.post(`${this.controller}/add-careerpath`,careerPath);
  }

  editCareerPath(careerPath: CareerPath){
    return this.http.put(`${this.controller}/edit-careerpath`,careerPath);
  }

  deleteCareerPath(careerPathID: number){
    return this.http.delete(`${this.controller}/delete-careerpath/${careerPathID}`);
  }

  addTechnology(technology: Technology){
    return this.http.post(`${this.controller}/add-technology`,technology);
  }

  editTechnology(technology: Technology){
    return this.http.put(`${this.controller}/edit-technology`,technology);
  }

  deleteTechnology(technologyID: number){
    return this.http.delete(`${this.controller}/delete-technology/${technologyID}`);
  }
  
  addTool(tool: Tool){
    return this.http.post(`${this.controller}/add-tool`,tool);
  }

  editTool(tool: Tool){
    return this.http.put(`${this.controller}/edit-tool`,tool);
  }

  deleteTool(toolID: number){
    return this.http.delete(`${this.controller}/delete-tool/${toolID}`);
  }

  addMethodology(methodology: Methodology){
    return this.http.post(`${this.controller}/add-methodology`,methodology);
  }

  editMethodology(methodology: Methodology){
    return this.http.put(`${this.controller}/edit-methodology`,methodology);
  }

  deleteMethodology(methodologyID: number){
    return this.http.delete(`${this.controller}/delete-methodology/${methodologyID}`);
  }

  addProject(project: Project){
    return this.http.post(`${this.controller}/add-project`,project);
  }

  editProject(project: Project){
    return this.http.put(`${this.controller}/edit-project`,project);
  }

  deleteProject(projectID: number){
    return this.http.delete(`${this.controller}/delete-project/${projectID}`);
  }

  addEducation(education: Education){
    return this.http.post(`${this.controller}/add-education`,education);
  }

  editEducation(education: Education){
    return this.http.put(`${this.controller}/edit-education`,education);
  }

  deleteEducation(educationID: number){
    return this.http.delete(`${this.controller}/delete-education/${educationID}`);
  }
  generatePDF(userName:string){
    return this.http.get(`${this.controller}/generate-pdf/${userName}`);
  }
}
