import axios from "axios";
import { TodoModel } from "../Models/TodoModel";
import { CredentialsModel, UserModel, UsersModel } from "../Models/Welcome";
import globals from "./globals";
import tokenAxios from "./InterceptorAxios";

class WebApi {
  private usersTasksApi = globals.urls.usersTasks;
  private adminApi = globals.urls.admin;
  private welcomeApi = globals.urls.welcome;

  public async addTask(task: TodoModel): Promise<any> {
    return await tokenAxios.post<TodoModel>(this.usersTasksApi, task);
  }

  public async updateTask(id: number, task: TodoModel): Promise<any> {
    return await tokenAxios.put<any>(this.usersTasksApi + id, task);
  }

  public async deleteTask(id: number): Promise<any> {
    return await tokenAxios.delete<any>(this.usersTasksApi + id);
  }

  public async getAllTasks(): Promise<any> {
    return await tokenAxios.get<TodoModel[]>(this.usersTasksApi);
  }

  public async getSingleTask(id: number): Promise<any> {
    return await tokenAxios.get<TodoModel>(this.usersTasksApi + id);
  }

  public async countTasks(): Promise<any> {
    return await tokenAxios.get<number>(this.usersTasksApi + "count");
  }

  public async getAdminTasks(): Promise<any> {
    return await tokenAxios.get<TodoModel[]>(this.adminApi + "tasks");
  }

  public async getAdminUsers(): Promise<any> {
    return await tokenAxios.get<UsersModel[]>(this.adminApi + "users");
  }

  public async countAdminTasks(): Promise<any> {
    return await tokenAxios.get<number>(this.adminApi + "tasks/count");
  }

  public async countAdminUsers(): Promise<any> {
    return await tokenAxios.get<number>(this.adminApi + "users/count");
  }

  public async register(credentials: CredentialsModel): Promise<any> {
    return await axios.post<any>(this.welcomeApi + "register", credentials);
  }

  public async login(credentials: CredentialsModel): Promise<any> {
    return await axios.post<UserModel>(this.welcomeApi + "login", credentials);
  }
}

const web = new WebApi();
export default web;