using Microsoft.AspNetCore.Mvc;

namespace Notes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : Controller
{
    private static readonly List<Note> Notes =
    [
        new(1, "First note"),
        new(2, "Second note")
    ];

    [HttpGet]
    public IEnumerable<Note> Get() => Notes;

    [HttpPost]
    public IActionResult Add(Note note)
    {
        // Generate the next id
        var nextId = Notes.Max(n => n.Id) + 1;

        // Mutate the incoming note by creating a new instance with the new id
        Notes.Add(note with { Id = nextId });

        return Ok();
    }
}