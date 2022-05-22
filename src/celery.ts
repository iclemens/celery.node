
export class InvalidTaskError extends Error {};
export class NotRegistered extends Error {};

export class Task 
{
  public name: string;
}

// Extends dictionary...
export class TaskRegistry
{
  private tasks: {[key: string]: Task} = {};

  public filter_types(type) {
    // Filter
  }
  
  public periodic() {
    return this.filter_types("periodic");
  }
  
  public register(task: Task | (() => Task)) {
    if (!task.name)
      throw new InvalidTaskError('Task class must specify name attribute');

    this.tasks[task.name] = (task instanceof Task) ? task : task();
  }
  
  public regular() {
    return this.filter_types("regular");
  }

  public unregister(name: string | Task) {
    if (typeof name === 'string') {
      delete this.tasks[name];
    }
  }
}
