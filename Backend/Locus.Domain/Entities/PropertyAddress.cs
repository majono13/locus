namespace Locus.Domain.Entities
{
    public class PropertyAddress : EntityBase
    {
        public string Street {  get; set; } = String.Empty;
        public string Neighborhood {  get; set; } = String.Empty;
        public string City {  get; set; } = String.Empty;
        public string State {  get; set; } = String.Empty;
        public string Cep {  get; set; } = String.Empty;
        public int number {  get; set; }
    }
}
