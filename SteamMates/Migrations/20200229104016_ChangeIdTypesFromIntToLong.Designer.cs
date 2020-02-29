﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SteamMates.Models.Persistence;

namespace SteamMates.Migrations
{
    [DbContext(typeof(SteamContext))]
    [Migration("20200229104016_ChangeIdTypesFromIntToLong")]
    partial class ChangeIdTypesFromIntToLong
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SteamMates.Models.Persistence.GameIdentifier", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("SteamId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SteamId")
                        .IsUnique();

                    b.ToTable("Games");
                });

            modelBuilder.Entity("SteamMates.Models.Persistence.Rating", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("GameId")
                        .HasColumnType("bigint");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasAlternateKey("UserId", "GameId");

                    b.HasIndex("GameId");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("SteamMates.Models.Persistence.UserIdentifier", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("SteamId")
                        .IsRequired()
                        .HasColumnType("nvarchar(17)")
                        .HasMaxLength(17);

                    b.HasKey("Id");

                    b.HasIndex("SteamId")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SteamMates.Models.Persistence.Rating", b =>
                {
                    b.HasOne("SteamMates.Models.Persistence.GameIdentifier", "Game")
                        .WithMany("Ratings")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SteamMates.Models.Persistence.UserIdentifier", "User")
                        .WithMany("Ratings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
