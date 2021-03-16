namespace EventSourcingTaskApp.Controllers
{
    using EventSourcingTaskApp.Infrastructure;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Threading.Tasks;

    [Route("api/tasks/{id}")]
    [ApiController]
    [Consumes("application/x-www-form-urlencoded")]
    public class TasksController : ControllerBase
    {
        private readonly AggregateRepository _aggregateRepository;

        public TasksController(AggregateRepository aggregateRepository)
        {
            _aggregateRepository = aggregateRepository;
        }

        [HttpPost, Route("create")]
        public async Task<IActionResult> Create(Guid id, [FromForm] string title)
        {
            var aggregate = await _aggregateRepository.LoadAsync<Core.Task>(id);
            aggregate.Create(id, title, "Ahmet KÜÇÜKOĞLU");

            await _aggregateRepository.SaveAsync(aggregate);

            Console.WriteLine("Check it");
            return Ok("Cool");
        }
    }
}