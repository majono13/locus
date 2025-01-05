using Locus.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Locus.Infrastructure.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly LocusDbContext _dbContext;

        public UnitOfWork(LocusDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Commit() => await _dbContext.SaveChangesAsync();
    }
}
