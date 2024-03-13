using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class adressDTO
    {
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string street { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public int zipCode { get; set; }

    }
}