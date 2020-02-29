using Microsoft.EntityFrameworkCore.Migrations;

namespace SteamMates.Migrations
{
    public partial class ChangeIdTypesFromIntToLong : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            DropConstraints(migrationBuilder);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Users",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "Ratings",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "GameId",
                table: "Ratings",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Ratings",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "Games",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            AddConstraints(migrationBuilder);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            DropConstraints(migrationBuilder);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Users",
                type: "int",
                nullable: false,
                oldClrType: typeof(long))
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Ratings",
                type: "int",
                nullable: false,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<int>(
                name: "GameId",
                table: "Ratings",
                type: "int",
                nullable: false,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Ratings",
                type: "int",
                nullable: false,
                oldClrType: typeof(long))
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Games",
                type: "int",
                nullable: false,
                oldClrType: typeof(long))
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            AddConstraints(migrationBuilder);
        }

        private void AddConstraints(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Games",
                table: "Games",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ratings",
                table: "Ratings",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Users_UserId",
                table: "Ratings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Games_GameId",
                table: "Ratings",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Ratings_UserId_GameId",
                table: "Ratings",
                columns: new[] { "UserId", "GameId" });

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_GameId",
                table: "Ratings",
                column: "GameId");
        }

        private void DropConstraints(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Ratings_UserId_GameId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Users_UserId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Games_GameId",
                table: "Ratings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ratings",
                table: "Ratings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Games",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_GameId",
                table: "Ratings");
        }
    }
}
