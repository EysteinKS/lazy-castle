export abstract class Task {
  protected isActive: boolean = false;
  protected hasStarted: boolean = false;
  protected hasEnded: boolean = false;

  protected _task: number = 0;
  protected _func: () => void = () => {};
  protected _timer: number = 0;
  protected _timeStarted: number = 0;

  constructor(func: () => void, timer: number) {
    this._func = func;
    this._timer = timer;
  }

  protected _start() {
    this.hasStarted = true;
    this.isActive = true;
    this._timeStarted = Date.now();
  }

  protected _stop() {
    this._func = () => {};
    this._timer = 0;
    this.isActive = false;
    this.hasEnded = true;
    this._task = 0;
  }

  abstract start(): void;
  abstract stop(): void;

  public getStatus(){
    return {
      isActive: this.isActive,
      hasStarted: this.hasStarted,
      hasEnded: this.hasEnded
    }
  }
}

export class TimeoutTask extends Task {
  constructor(func: () => void, timer: number) {
    super(func, timer);
  }

  private _startTimeout() {
    let timeoutFunc = () => {
      this._func()
      this._stop()
    }
    this._task = window.setTimeout(timeoutFunc, this._timer);
    this._start();
  }

  private _pauseTimeout() {
    window.clearTimeout(this._task);
    this._timer = this._timer = Date.now() - this._timeStarted;
    this.isActive = false;
  }

  private _resumeTimeout() {
    this._startTimeout();
  }

  private _stopTimeout() {
    this._stop();
  }

  private _remaningTime() {
    return this._timer - (Date.now() - this._timeStarted);
  }

  public start() {
    this._startTimeout();
  }

  public pause() {
    this._pauseTimeout();
  }

  public resume() {
    this._resumeTimeout();
  }

  public stop() {
    this._stopTimeout();
  }

  public getRemainingTime() {
    return this._remaningTime();
  }
}

export class IntervalTask extends Task {
  constructor(func: () => void, timer: number) {
    console.log("New IntervalTask created");
    super(func, timer);
  }

  private _startInterval() {
    this._task = window.setInterval(this._func, this._timer);
    this._start();
  }

  private _stopInterval() {
    window.clearInterval(this._task);
    this._stop();
  }

  public start() {
    console.log("Starting interval");
    this._startInterval();
  }

  public stop() {
    this._stopInterval();
  }
}

export class InstantTask {
  private _func: Function;
  private _isActive: boolean = false
  private _hasEnded: boolean = false

  constructor(func: Function){
    this._func = func
  }

  public start(){
    this._isActive = true
    this._func()
    this._hasEnded = true
  }

  public stop(){
    this._func = () => {}
    this._isActive = false
  }

  public getStatus(){
    return {
      isActive: this._isActive,
      hasEnded: this._hasEnded
    }
  }
}

export type Tasks = Task | IntervalTask | TimeoutTask | InstantTask;

export class TaskManager {
  private static instance: TaskManager;
  private _taskQueue: Tasks[] = [];
  private _activeTasks: Tasks[] = [];

  public static getInstance(): TaskManager {
    if(!TaskManager.instance){
      TaskManager.instance = new TaskManager()
    }
    return TaskManager.instance
  }

  private _startTasks() {
    //Runs all queued tasks if any are queued
    if (this._taskQueue.length > 0) {
      this._taskQueue.forEach(task => {
        task.start();
        this._activeTasks.push(task);
      });
      this._taskQueue = [];
    }
  }

  private _removeEndedTasks() {
    if(this._activeTasks.length > 0){
      this._activeTasks = this._activeTasks.filter(task => {
        let status = task.getStatus()
        return (status.isActive && !status.hasEnded)
      })
    }
  }

  public push(task: Tasks) {
    this._taskQueue.push(task);
  }

  public run() {
    this._startTasks()
    this._removeEndedTasks()
  }

  public stop() {
    this._taskQueue = []
    if(this._activeTasks.length > 0){
      this._activeTasks.forEach(task => task.stop())
      this._activeTasks = []
    }
  }
}
