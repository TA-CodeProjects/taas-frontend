import { TodoModel } from "../Models/TodoModel";

export class TasksAppState {
    public tasks: TodoModel[] = [];
}

export enum TasksActionType {
  TasksDownloaded = "TasksDownloaded",
  TaskAdded = "TaskAdded",
  TaskUpdated = "TaskUpdated",
  TaskDeleted = "TaskDeleted",
  TasksClear = "TasksClear"
}

export interface TaskAction {
    type: TasksActionType;
    payload: any;
}

export function tasksDownloadedAction(tasks: TodoModel[]): TaskAction {
    return { type: TasksActionType.TasksDownloaded, payload: tasks };
}

export function taskAddedAction(task: TodoModel): TaskAction {
  return { type: TasksActionType.TaskAdded, payload: task };
}

export function taskUpdatedAction(task: TodoModel): TaskAction {
  return { type: TasksActionType.TaskUpdated, payload: task };
}

export function taskDeletedAction(id: number): TaskAction {
  return { type: TasksActionType.TaskDeleted, payload: id };
}

export function tasksClear(): TaskAction {
  return { type: TasksActionType.TaskDeleted, payload: {}};
}




export function tasksReducer(currentState: TasksAppState = new TasksAppState(), action: TaskAction): TasksAppState {
    const newState = { ...currentState}

    switch (action.type) {
      case TasksActionType.TasksDownloaded:
        newState.tasks = action.payload;
        break;
      case TasksActionType.TaskAdded:
        newState.tasks.push(action.payload);
        break;
      case TasksActionType.TaskUpdated:
        const idx = newState.tasks.findIndex((t) => t.id === action.payload.id);
        newState.tasks[idx] = action.payload;
        break;
      case TasksActionType.TaskDeleted:
        newState.tasks = newState.tasks.filter((c) => c.id !== action.payload);
        break;
      case TasksActionType.TasksClear:
        newState.tasks = [];
        break;
    }
    return newState;
}
    
