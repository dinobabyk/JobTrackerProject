using JobAppTrackAPI.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using JobAppTrackAPI.Models;
using JobAppTrackAPI.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace JobAppTrackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        public JobApplicationsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllJobApplications(int pageNumber,int pageSize)
        {
            try
            {
                int totalCount = dbContext.JobApplications.ToList().Count();
                var allJobApplications = await dbContext.JobApplications.AsNoTracking().OrderBy(x => x.Id).Skip((pageNumber) * pageSize).Take(pageSize).ToListAsync();
                return Ok(new { status = true, response = allJobApplications, itemCount = totalCount });
            }
            catch (Exception e)
            {
                return Ok(new { status = false, response = "" });
            }
        }
        [HttpGet]
        [Authorize]
        [Route("{id:guid}")]
        public IActionResult GetJobApplicationById(Guid id)
        {
            try
            {
                var applications = dbContext.JobApplications.Find(id);
                if (applications is null)
                {
                    return NotFound();
                }
                return Ok(new { status = true, response = applications });
            }
            catch (Exception e)
            {
                return Ok(new { status = false, response = "" });
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult AddJobApplication(AddJobApplicationDto ReqData)
        {
            try
            {
                var applicationEntity = new JobApplication()
                {
                    CompanyName = ReqData.CompanyName,
                    Position = ReqData.Position,
                    Description = ReqData.Description,
                    Status = ReqData.Status,
                    CreatedBy = ReqData.CreatedBy,
                    CreatedOn = DateTime.Now
                };
                dbContext.Add(applicationEntity);
                dbContext.SaveChanges();
                return Ok(new { status = true, response = applicationEntity });
            }
            catch (Exception e)
            {
                return Ok(new { status = false, response = "" });
            }

        }
        [HttpPut]
        [Authorize]
        [Route("{id:guid}")]
        public IActionResult UpdateJobApplication(Guid id, UpdateJobApplicationDto ReqObj)
        {
            try
            {
                var application = dbContext.JobApplications.Find(id);
                if (application is null)
                {
                    return NotFound();
                }
                application.CompanyName = ReqObj.CompanyName;
                application.Position = ReqObj.Position;
                application.Description = ReqObj.Description;
                application.Status = ReqObj.Status;
                application.ModifiedBy = ReqObj.ModifiedBy;
                application.ModifiedOn = DateTime.Now;
                dbContext.SaveChanges();
                return Ok(new { status = true, response = application });
            }
            catch (Exception e)
            {
                return Ok(new { status = false, response = "" });
            }
        }
        [HttpPut]
        [Authorize]
        [Route("{id:guid},{status:alpha}")]
        public IActionResult UpdateApplicationStatus(Guid id, string status)
        {
            try
            {
                var application = dbContext.JobApplications.Find(id);
                if (application is null)
                {
                    return NotFound();
                }
                application.Status = status;
                application.ModifiedOn = DateTime.Now;
                dbContext.SaveChanges();
                return Ok(new { status = true, response = application });
            }
            catch (Exception e)
            {
                return Ok(new { status = false, response = "" });
            }
        }
    }
}
