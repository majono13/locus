﻿namespace Locus.Domain.Repositories
{
    public interface IUnitOfWork
    {
        public Task Commit();
    }
}
