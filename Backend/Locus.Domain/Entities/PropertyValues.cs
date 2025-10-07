namespace Locus.Domain.Entities
{
    public class PropertyValues : EntityBase
    {
        public Guid PropertyId { get; set; }
        public decimal Iptu { get; set; }
        public decimal Value { get; set; }
        public Enums.PropertyValueEnum Type { get; set; }
    }
}
