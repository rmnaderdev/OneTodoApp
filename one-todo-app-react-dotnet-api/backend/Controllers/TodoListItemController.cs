using Backend.Contracts;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoListItemController(AppDbContext db) : ControllerBase
    {

        [HttpGet("{listId:int}", Name = "GetTodos")]
        public async Task<ActionResult<IEnumerable<TodoItem>>> Get(int listId)
        {
            var todos = await db.TodoItems
                .Where(t => t.TodoListId == listId)
                .AsNoTracking()
                .ToListAsync();

            return Ok(todos);
        }

        [HttpPost("{listId:int}", Name = "CreateTodoItem")]
        public async Task<ActionResult<TodoItem>> CreateTodoItem(int listId, NewTodoItem newTodoItem)
        {
            var listRecord = await db.TodoLists.FirstOrDefaultAsync(x => x.Id == listId);
            if (listRecord == null)
            {
                return NotFound();
            }

            var todoItem = new TodoItem
            {
                TodoListId = listRecord.Id,
                Title = newTodoItem.Title,
                IsCompleted = newTodoItem.IsCompleted ?? false
            };
            db.TodoItems.Add(todoItem);
            await db.SaveChangesAsync();

            return Ok(todoItem);
        }

        [HttpPut("{listItemId:int}", Name = "UpdateTodoItem")]
        public async Task<ActionResult> UpdateTodoItem(int listItemId, NewTodoItem updatedTodoItem)
        {
            var todoItem = await db.TodoItems.FindAsync(listItemId);
            if (todoItem == null)
            {
                return NotFound();
            }
            todoItem.Title = updatedTodoItem.Title;
            todoItem.IsCompleted = updatedTodoItem.IsCompleted ?? todoItem.IsCompleted;
            await db.SaveChangesAsync();
            return Ok(todoItem);
        }

        [HttpDelete("{listItemId:int}", Name = "DeleteTodoItem")]
        public async Task<ActionResult> DeleteTodoItem(int listItemId)
        {
            var todoItem = await db.TodoItems.FindAsync(listItemId);
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
