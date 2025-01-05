using System;

namespace Communication.Responses.User
{
    public class ResponseUserJson
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool Active { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Type { get; set; } = String.Empty;
    }
}
