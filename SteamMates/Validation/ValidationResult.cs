namespace SteamMates.Validation
{
    public class ValidationResult
    {
        public ValidationResult(ValidationStatus status)
        {
            Status = status;
        }

        public ValidationResult(ValidationStatus status, string message)
        {
            Status = status;
            Message = message;
        }

        public ValidationStatus Status { get; set; }

        public string Message { get; set; }
    }
}
