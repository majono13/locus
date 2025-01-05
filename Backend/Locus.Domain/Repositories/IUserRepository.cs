﻿using Locus.Domain.Entities;

namespace Locus.Domain.Repositories
{
    public interface IUserRepository
    {
        public Task Create(User user);
        public Task<User?> GetActiveUserByEmail(string email);
        public Task<User?> GetUserByEmailAndPassword(string email, string password);
    }
}
