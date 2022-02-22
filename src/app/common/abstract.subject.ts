import {AbstractObserver} from './abstract.observer';

interface AbstractSubjectInterface {
  attach(observer: AbstractObserver): void;

  detach(observer: AbstractObserver): void;

  notify(): void;
}

export abstract class AbstractSubject implements AbstractSubjectInterface {
  private observers: AbstractObserver[] = [];

  public attach(observer: AbstractObserver): void {
    if (this.observers.includes(observer)) {
      return;
    }

    this.observers.push(observer);
  }

  public detach(observer: AbstractObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return;
    }

    this.observers.splice(observerIndex, 1);
  }

  public notify(): void {
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}
