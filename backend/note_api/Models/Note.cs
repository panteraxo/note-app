using note_api.Models;

public class Note
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public bool Archived { get; set; }
    public DateTime? Created { get; set; }
    public DateTime? Updated { get; set; }
    public ICollection<NoteCategory> NoteCategories { get; set; } = new List<NoteCategory>();
}