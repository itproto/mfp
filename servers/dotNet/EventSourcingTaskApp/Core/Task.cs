namespace EventSourcingTaskApp.Core
{
    using System;
    using EventSourcingTaskApp.Core.Events;
    using EventSourcingTaskApp.Core.Exceptions;
    using EventSourcingTaskApp.Core.Framework;

    public enum BoardSections
    {
        Open = 1,
        InProgress = 2,
        Done = 3
    }
    public class Task : Aggregate
    {
        public string Title { get; private set; }
        public BoardSections Section { get; private set; }
        public string AssignedTo { get; private set; }
        public bool IsCompleted { get; private set; }
        protected override void When(object @event)
        {
            switch (@event)
            {
                case CreatedTask x: OnCreated(x); break;
            }
        }

        public void Create(Guid taskId, string title, string createdBy)
        {
            if (Version >= 0)
            {
                throw new TaskAlreadyCreatedException();
            }

            Apply(new CreatedTask
            {
                TaskId = taskId,
                CreatedBy = createdBy,
                Title = title,
            });
        }


        #region Event Handlers

        private void OnCreated(CreatedTask @event)
        {
            Id = @event.TaskId;
            Title = @event.Title;
            Section = BoardSections.Open;
        }

        #endregion
    }
}