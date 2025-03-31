namespace JobAppTrackAPI.Models
{
    public class AddJobApplicationDto
    {
        public required string CompanyName { get; set; }
        public required string Position { get; set; }
        public string? Description { get; set; }
        public required string Status { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public required string CreatedBy { get; set; }
    }
}
