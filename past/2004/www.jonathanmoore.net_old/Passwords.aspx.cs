using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;



    public partial class Passwords : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SqlConnection myConnection = new SqlConnection("server=localhost;Trusted_Connection=yes;database=Passwords");
            SqlDataAdapter myCommand = new SqlDataAdapter("select * from Sites ORDER BY Site Asc", myConnection);

            DataSet ds = new DataSet();
            myCommand.Fill(ds, "Sites");

            MyRepeater.DataSource = ds.Tables["Sites"].DefaultView;
            MyRepeater.DataBind();

        }
    }


