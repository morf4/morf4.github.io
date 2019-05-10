using System;
using System.Data;
using System.Configuration;
using System.ComponentModel;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Net.Mail;



    public partial class Contact : System.Web.UI.Page
    {

        protected void Button1_Click(object sender, System.EventArgs e)
        {
            SmtpClient smtpClient = new SmtpClient();
            MailMessage message = new MailMessage();
            MailAddress fromAddress = new MailAddress(TextBox2.Text, TextBox1.Text);
            smtpClient.Host = "localhost";
            smtpClient.Port = 25;
            message.From = fromAddress;
            message.To.Add("jonathan@jonathanmoore.net");
            message.Subject = "Feedback";
            message.Body = TextBox3.Text;
            smtpClient.Send(message);
            Response.Redirect("http://www.jonathanmoore.net");
        }
    }



