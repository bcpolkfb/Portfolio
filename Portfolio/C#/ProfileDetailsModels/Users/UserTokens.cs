using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class UserTokens
    {
        public string Token { get; set; }
        public int UserId { get; set; }
    }
}
