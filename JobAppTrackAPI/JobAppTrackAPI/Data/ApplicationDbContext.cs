using JobAppTrackAPI.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace JobAppTrackAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        { 
        }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var User1 = new User { Id=1, UserName = "superadmin", Password = "superadmin", FullName = "Super Admin" };
            var User2 = new User { Id=2, UserName = "admin", Password = "admin", FullName ="Admin User" };

            modelBuilder.Entity<User>().HasData(User1, User2);
            base.OnModelCreating(modelBuilder); 
        }
    }
}
