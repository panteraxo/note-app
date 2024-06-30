namespace note_api.ViewModel
{
    public class NoteViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool Archived { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
        public List<int> CategoryIds { get; set; } = new List<int>();
    }
}
