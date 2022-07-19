class Globals{

}

class DevelopmentGlobals extends Globals {
  public urls = {
    usersTasks: "http://localhost:8080/api/users/tasks/",
    admin: "http://localhost:8080/api/admin/",
    welcome: "http://localhost:8080/api/welcome/",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    usersTasks: "http://localhost:8080/api/users/tasks/",
    admin: "http://localhost:8080/api/admin/",
    welcome: "http://localhost:8080/api/welcome/",
  };
}

const globals = process.env.NODE_ENV !== 'production' ? new DevelopmentGlobals() : new ProductionGlobals();

export default globals;

