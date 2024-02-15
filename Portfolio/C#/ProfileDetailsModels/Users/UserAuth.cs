using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class UserAuth : BaseUserAuth
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public List<LookUp> Roles { get; set; }
    }
}
