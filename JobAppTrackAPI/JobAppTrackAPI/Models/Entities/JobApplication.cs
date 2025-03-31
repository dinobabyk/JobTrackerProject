namespace JobAppTrackAPI.Models.Entities
{
    public class JobApplication
    {
        public Guid Id { get; set; }
        public required string CompanyName { get; set; }
        public required string Position { get; set; }
        public string? Description { get; set; }
        public required string Status { get; set; }
        public DateTime CreatedOn { get; set; }
        public required string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
