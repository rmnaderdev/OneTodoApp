using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class TodoList
    {
        [Key]
        public int Id { get; set; }

        public required string Name { get; set; }

        public List<TodoItem> Items { get; set; } = new();
    }
}
