using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class TodoItem
    {
        [Key]
        public int Id { get; set; }

        public int TodoListId { get; set; }
        [ForeignKey("TodoListId")]
        public TodoList TodoList { get; set; }

        public required string Title { get; set; }
        public bool IsCompleted { get; set; }
        public bool Deleted { get; set; } = false;
    }
}
