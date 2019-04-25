using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace Reporting.Models
{
    public class CirculationContext
    {
        public string ConnectionString { get; set; }

        public CirculationContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
        public List<Circulations> GetAllAlCirculations()
        {
            List<Circulations> list = new List<Circulations>();
            ConnectionString = "server=reportingaurora.ct0vtd3stxoq.us-east-1.rds.amazonaws.com;port=3306;database=Reporting;user=mmao;password=welcome.313;convert zero datetime=True";
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT LibraryID, month(Date) AS Month, Service, SUM(Transactions) AS Transactions from Circulations where YEAR(Date) = 2018 AND libraryID = 1062 group by MONTH(DATE), Service order by MONTH(Date)", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Circulations()
                        {
                            LibraryID = Convert.ToInt32(reader["LibraryID"]),
                            Month = Convert.ToInt32(reader["Month"]),
                            MediaType = reader["Service"].ToString(),
                            Transactions = Convert.ToInt32(reader["Transactions"]),
                        });
                    }
                }
            }
            return list;
        }

    }
}
