
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<AppDbContext>(options => 
                options.UseSqlite("Data Source=database.db"));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseCors();

            app.UseAuthorization();


            app.MapControllers();

            // Only run migrations when running the app (not during build openapi gen)
            if (Assembly.GetEntryAssembly()?.GetName().Name != "GetDocument.Insider")
            {
                // Run migrations
                using (var scope = app.Services.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                    db.Database.Migrate();
                }

                // Seed database
                using (var scope = app.Services.CreateScope())
                {
                    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                    if (!db.TodoLists.Any() && !db.TodoItems.Any())
                    {
                        var newList = new TodoList { Name = "My First Todo List" };
                        db.TodoLists.Add(newList);
                        db.SaveChanges();

                        db.TodoItems.AddRange(
                            new TodoItem { TodoListId = newList.Id, Title = "Learn C# 14.0" },
                            new TodoItem { TodoListId = newList.Id, Title = "Build an ASP.NET Core app" },
                            new TodoItem { TodoListId = newList.Id, Title = "Explore new features in .NET 10" }
                        );
                        db.SaveChanges();
                    }
                }
            }

            app.Run();
        }
    }
}
