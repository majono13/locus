using System;
using System.Collections.Generic;
using System.Linq;
namespace Locus.Domain.Entities
{
    public class Property : EntityBase
    {
        public decimal Code { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public Enums.PropertyTypeEnum Type { get; set; }
        public Enums.PropertyStatusEnum Status { get; set; }
        public Guid UserId { get; set; }
        public int Rooms { get; set; }
        public int Area { get; set; }
        public int Bathrooms { get; set; }
        public int ParkingSpace { get; set; }
        public decimal? Condominium { get; set; }
        public Guid AddressId { get; set; }

        public virtual PropertyAddress Address { get; set; } = null!;
        public virtual IList<PropertyValues> PropertyValues { get; set; } = [];

    }
}
