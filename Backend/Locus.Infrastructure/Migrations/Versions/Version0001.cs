using FluentMigrator;

namespace Locus.Infrastructure.Migrations.Versions
{
    [Migration(DatabaseVersions.TABLE_USER, "Create table user")]
    public class Version0001 : ForwardOnlyMigration
    {
        public override void Up()
        {
            Create.Table("users")
                .WithColumn("id").AsGuid().PrimaryKey()
                .WithColumn("createdAt").AsDateTime().WithDefaultValue(DateTime.Now).NotNullable()
                .WithColumn("active").AsBoolean().NotNullable().WithDefaultValue(true)
                .WithColumn("name").AsString(250).NotNullable()
                .WithColumn("email").AsString(250).NotNullable()
                .WithColumn("password").AsString(2000).NotNullable()
                .WithColumn("type").AsInt32().NotNullable().WithDefaultValue(0);
        }
    }
}
