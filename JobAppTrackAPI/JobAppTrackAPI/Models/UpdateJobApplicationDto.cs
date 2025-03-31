namespace JobAppTrackAPI.Models
{
    public class UpdateJobApplicationDto
    {
        public required string CompanyName { get; set; }
        public required string Position { get; set; }
        public string? Description { get; set; }
        public required string Status { get; set; }
        public DateTime ModifiedOn { get; set; } = DateTime.Now;
        public required string ModifiedBy { get; set; }
    }
}
