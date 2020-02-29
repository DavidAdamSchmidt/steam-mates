using Microsoft.EntityFrameworkCore.Migrations;

namespace SteamMates.Migrations
{
    public partial class AddCheckConstraintToColumnValueOfTableRatings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateCheckConstraint(
                name: "CK_Ratings_Value",
                table: "Ratings",
                sql: "[Value] BETWEEN 1 AND 5");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Ratings_Value",
                table: "Ratings");
        }
    }
}
