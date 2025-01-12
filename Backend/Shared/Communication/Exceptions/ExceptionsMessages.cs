namespace Communication.Exceptions
{
    public static class ExceptionsMessages
    {
        public const string UNKNOW_ERRROR = "Erro desconhecido.";
        public const string EMAIL_EMPTY = "O e-mail é obrigatório.";
        public const string EMAIL_INVALID = "O e-mail informado é inválido.";
        public const string EMAIL_REGISTERED = "O e-mail informado já está registrado na plataforma.";
        public const string EMAIL_MAXIMUM_CHARACTERS = "O e-mail deve ter no máximo 250 caracteres.";
        public const string NAME_EMPTY = "O nome é obrigatório.";
        public const string NAME_MAXIMUM_CHARACTERS = "O nome deve ter no máximo 250 caracteres.";
        public const string PASSWORD_MIN_LENGTH = "A senha deve ter no mínimo 6 caracteres.";
        public const string NEW_PASSWORD_EQUAL = "A nova senha não pode ser a mesma da senha atual.";
        public const string SAME_PASSWORD = "As senhas não podem ser iguais.";
        public const string INVALID_PASSWORD = "Senha incorreta.";
        public const string TYPE_USER_INVALID = "O tipo do usuário é inválido.";
        public const string TYPE_EMPTY = "O tipo do usuário é obrigatório.";
        public const string INVALID_LOGIN = "E-mail e/ou senha inválidos.";
        public const string INVALID_TOKEN = "Token inválido.";
        public const string UNAUTHORIZED_USER = "Usuário não possui permissão para acessar o recurso.";

    }
}