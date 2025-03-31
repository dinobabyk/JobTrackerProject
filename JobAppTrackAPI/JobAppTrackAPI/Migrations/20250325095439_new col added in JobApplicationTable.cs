using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JobAppTrackAPI.Migrations
{
    /// <inheritdoc />
    public partial class newcoladdedinJobApplicationTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "JobApplications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedOn",
                table: "JobApplications",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "JobApplications");

            migrationBuilder.DropColumn(
                name: "ModifiedOn",
                table: "JobApplications");
        }
    }
}
