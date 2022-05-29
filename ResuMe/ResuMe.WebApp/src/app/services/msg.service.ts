import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor() { }

  
  $emitterSetCurriculum = new EventEmitter<any>();
  emitSetCurriculum(cv: any) {
    this.$emitterSetCurriculum.emit(cv);
  }


  $emitterUserNameChanged = new EventEmitter<any>();
  emitUserNameChanged(user: User) {
    this.$emitterUserNameChanged.emit(user);
  }
}
