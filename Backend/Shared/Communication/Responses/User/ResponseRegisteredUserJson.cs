namespace Communication.Responses.User
{
    public class ResponseRegisteredUserJson
    {
        public string Token { get; set; } = string.Empty;
        public Guid Id { get; set; }
    }
}
