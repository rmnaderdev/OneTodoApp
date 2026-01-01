using Backend.Contracts;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoListController(AppDbContext db) : ControllerBase
    {
        [HttpGet(Name = "GetTodoLists")]
        public async Task<ActionResult> Get()
        {
            var todoLists = await db.TodoLists.ToListAsync();

            return Ok(todoLists);
        }

        [HttpPost(Name = "CreateTodoList")]
        public async Task<ActionResult> Create(NewTodoList newTodoList)
        {
            var todoList = new TodoList
            {
                Name = newTodoList.Name
            };
            db.TodoLists.Add(todoList);
            await db.SaveChangesAsync();

            return Ok(todoList);
        }

        [HttpDelete("{listId:int}", Name = "DeleteTodoList")]
        public async Task<ActionResult> Delete(int listId)
        {
            var todoList = await db.TodoLists.FindAsync(listId);
            if (todoList == null)
            {
                return NotFound();
            }
            db.TodoLists.Remove(todoList);
            await db.SaveChangesAsync();
            return NoContent();
        }
    }
}
