using System.ComponentModel.DataAnnotations;

namespace Backend.Contracts
{
    public class NewTodoItem
    {
        [Required]
        public required string Title { get; set; }

        public bool? IsCompleted { get; set; }
    }
}
