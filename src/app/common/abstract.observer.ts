import {AbstractSubject} from './abstract.subject';

export interface AbstractObserver {
  update(subject: AbstractSubject): void;
}
