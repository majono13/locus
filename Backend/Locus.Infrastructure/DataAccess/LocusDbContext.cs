using Locus.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Locus.Infrastructure.DataAccess
{
    public class LocusDbContext : DbContext
    {
        public LocusDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(LocusDbContext).Assembly);
        }
    }
}
