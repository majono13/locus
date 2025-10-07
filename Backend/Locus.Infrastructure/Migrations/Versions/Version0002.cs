using FluentMigrator;

namespace Locus.Infrastructure.Migrations.Versions
{
    [Migration(DatabaseVersions.TABLE_PROPERTY, "Create table property")]
    public class Version0002 : ForwardOnlyMigration
    {
        public override void Up()
        {

            Create.Table("property_address")
             .WithColumn("id").AsGuid().PrimaryKey()
             .WithColumn("createdAt").AsDateTime().WithDefaultValue(DateTime.Now).NotNullable()
             .WithColumn("active").AsBoolean().NotNullable().WithDefaultValue(true)
             .WithColumn("street").AsString(250).NotNullable()
             .WithColumn("neighborhood").AsString(250).NotNullable()
             .WithColumn("city").AsString(100).NotNullable()
             .WithColumn("state").AsString(100).NotNullable()
             .WithColumn("number").AsString(6).NotNullable()
             .WithColumn("cep").AsString(8).NotNullable();


            Create.Table("property")
                .WithColumn("id").AsGuid().PrimaryKey()
                .WithColumn("code").AsInt32().NotNullable()
                .WithColumn("createdAt").AsDateTime().WithDefaultValue(DateTime.Now).NotNullable()
                .WithColumn("active").AsBoolean().NotNullable().WithDefaultValue(true)
                .WithColumn("description").AsString(5000).NotNullable()
                .WithColumn("title").AsString(250).NotNullable()
                .WithColumn("type").AsInt32().NotNullable().WithDefaultValue(0)
                .WithColumn("status").AsInt32().NotNullable().WithDefaultValue(0)
                .WithColumn("userId").AsGuid().NotNullable().ForeignKey("FK_property_user_id", "users", "id")
                .WithColumn("rooms").AsInt32().NotNullable()
                .WithColumn("area").AsInt32().NotNullable()
                .WithColumn("bathrooms").AsInt32().NotNullable()
                .WithColumn("parkingSpace").AsInt32().NotNullable()
                .WithColumn("condominium").AsDecimal(10, 2).WithDefaultValue(0)
                .WithColumn("addressId").AsGuid().ForeignKey("FK_property_address_id", "property_address", "id");

            Create.Table("property_values")
               .WithColumn("id").AsGuid().PrimaryKey()
               .WithColumn("createdAt").AsDateTime().WithDefaultValue(DateTime.Now).NotNullable()
               .WithColumn("active").AsBoolean().NotNullable().WithDefaultValue(true)
               .WithColumn("propertyId").AsGuid().ForeignKey("FK_rent_property_id", "property", "id")
               .WithColumn("iptu").AsDecimal(10, 2).NotNullable().WithDefaultValue(0)
               .WithColumn("value").AsDecimal(10, 2).NotNullable().WithDefaultValue(0)
               .WithColumn("type").AsInt32().NotNullable().WithDefaultValue(0);
        }
    }
}
