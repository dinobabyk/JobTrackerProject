using System.Collections.Generic;
using JobAppTrackAPI.Data;
using JobAppTrackAPI.Models;
using JobAppTrackAPI.Models.Entities;
using JobAppTrackAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace JobAppTrackAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private readonly JwtService _jwtService;
        public UserController(ApplicationDbContext dbContext, JwtService jwtService)
        {
            this.dbContext = dbContext;
            _jwtService = jwtService;
        }
        [HttpPost]
        public IActionResult Login(UserDto ReqData)
        {
            try
            {
                var data = dbContext.Users.Where(p => p.UserName == ReqData.UserName && p.Password == ReqData.Password).ToList();
                if (data is null || data.Count <= 0)
                {
                    return Ok(new { status = false, message = "user not found" });
                }
                var token = _jwtService.GenerateToken(ReqData);
                return Ok(new { status = true, response = data, accessToken= token, message = "login success" });
            }
            catch (Exception e)
            {
                return Ok(new { status = false, response = "" });
            }            
        }
    }
}
