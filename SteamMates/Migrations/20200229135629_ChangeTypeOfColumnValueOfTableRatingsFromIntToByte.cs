using Microsoft.EntityFrameworkCore.Migrations;

namespace SteamMates.Migrations
{
    public partial class ChangeTypeOfColumnValueOfTableRatingsFromIntToByte : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte>(
                name: "Value",
                table: "Ratings",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Value",
                table: "Ratings",
                type: "int",
                nullable: false,
                oldClrType: typeof(byte));
        }
    }
}
