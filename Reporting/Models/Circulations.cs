using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reporting.Models
{
    public class Circulations
    {
        private CirculationContext context;

        public int LibraryID { get; set; }

        public int Month { get; set; }

        public string MediaType { get; set; }

        public int Transactions { get; set; }

    }
}
