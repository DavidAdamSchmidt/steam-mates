using Microsoft.EntityFrameworkCore.Migrations;

namespace SteamMates.Migrations
{
    public partial class AddUniqueConstraints : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Votes_UserId",
                table: "Votes");

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Votes_UserId_GameId",
                table: "Votes",
                columns: new[] { "UserId", "GameId" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_SteamId",
                table: "Users",
                column: "SteamId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Games_SteamId",
                table: "Games",
                column: "SteamId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Votes_UserId_GameId",
                table: "Votes");

            migrationBuilder.DropIndex(
                name: "IX_Users_SteamId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Games_SteamId",
                table: "Games");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_UserId",
                table: "Votes",
                column: "UserId");
        }
    }
}
