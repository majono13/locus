using Locus.Domain.Entities;
using Locus.Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Locus.Infrastructure.DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly LocusDbContext _dbContext;

        public UserRepository(LocusDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Create(User user)
        {
            await _dbContext.Users.AddAsync(user);
        }

        public async Task<User?> GetActiveUserByEmail(string email)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(user => user.Email.Equals(email) && user.Active);
        }

        public Task<User?> GetUserByEmailAndPassword(string email, string password)
        {
            return _dbContext.Users
                .FirstOrDefaultAsync(user => user.Email.Equals(email) && user.Password.Equals(password) && user.Active);
        }
    }
}
