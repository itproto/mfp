namespace EventSourcingTaskApp.Core.Exceptions
{
    using System;

    public class TaskAlreadyCreatedException : Exception
    {
        public TaskAlreadyCreatedException() : base("Task already created.") { }
    }

    public class TaskNotFoundException : Exception
    {
        public TaskNotFoundException() : base("Task not found.") { }
    }

    public class TaskCompletedException : Exception
    {
        public TaskCompletedException() : base("Task is completed.") { }
    }
}