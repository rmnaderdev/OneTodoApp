using Backend.Contracts;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController(AppDbContext db) : ControllerBase
    {

        [HttpGet(Name = "GetTodos")]
        public async Task<ActionResult<IEnumerable<TodoItem>>> Get()
        {
            var todos = await db.TodoItems
                .AsNoTracking()
                .ToListAsync();

            return Ok(todos);
        }

        [HttpPost(Name = "CreateTodoItem")]
        public async Task<ActionResult<TodoItem>> CreateTodoItem(NewTodoItem newTodoItem)
        {
            var firstList = await db.TodoLists.FirstOrDefaultAsync();

            var todoItem = new TodoItem
            {
                TodoListId = firstList?.Id ?? 0,
                Title = newTodoItem.Title,
                IsCompleted = newTodoItem.IsCompleted ?? false
            };
            db.TodoItems.Add(todoItem);
            await db.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}", Name = "UpdateTodoItem")]
        public async Task<ActionResult> UpdateTodoItem(int id, NewTodoItem updatedTodoItem)
        {
            var todoItem = await db.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }
            todoItem.Title = updatedTodoItem.Title;
            todoItem.IsCompleted = updatedTodoItem.IsCompleted ?? todoItem.IsCompleted;
            await db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}", Name = "DeleteTodoItem")]
        public async Task<ActionResult> DeleteTodoItem(int id)
        {
            var todoItem = await db.TodoItems.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }
            db.TodoItems.Remove(todoItem);
            await db.SaveChangesAsync();
            return NoContent();
        }
    }
}
