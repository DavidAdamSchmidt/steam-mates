using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SteamMates.Models.GameDetails;
using System;

namespace SteamMates.Converters
{
    public class SystemRequirementsConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var token = JToken.Load(reader);

            return token.Type == JTokenType.Array ? new SystemRequirements()
                : token.ToObject<SystemRequirements>();
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(SystemRequirements);
        }
    }
}
