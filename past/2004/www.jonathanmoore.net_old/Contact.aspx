<%@ Page Language="C#" Debug="true" AutoEventWireup="true" CodeFile="Contact.aspx.cs" Inherits="Contact" Theme="Default"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>www.jonathanmoore.net</title>    
</head>
<body id="_body" leftmargin="0" topmargin="0" background="images/background.jpg">
   <form  method="post"  id="Form1" runat="server">    
    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr> 
        <td>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
        <td width="0" align="left" valign="bottom"><a href="contact.aspx" id="_topMenu__trainingMenuItem"><img src="images/contact_down.gif" id="_topMenu_training" alt="Contact" name="training" border="0" class="HeadHome"/></a></td>
        <td width="228" align="right" valign="top"><asp:Image ID="Image3" SkinID="Logo" runat="server" /></td>
        </tr>
   </table>
    </td>
	</tr>
  <tr> 
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr> 
    <td width="44" align="left" valign="top"><img src="images/secondary_left_long.jpg" id="_img1" width="44" height="665" /></td>
    <td id="_snbCell" width="136" align="left" valign="top" background="images/secondary_nav_bround_long.jpg"><img src="images/clear_spacer.gif" id="_img2" width="136" height="76" />    
<table width="111" border="0" cellspacing="0" cellpadding="0">
  <tr>
	<td>
<span class="Nav">

		Archives<br />
		<asp:Image ID="Image1" SkinID="Bullet" runat="server" /><a id="A1" href="2008/Jan08.aspx">Jan, 2008</a>	
		<br />
		<asp:Image ID="Image4" SkinID="Bullet" runat="server" /><a id="A2" href="2008/Feb08.aspx">Feb, 2008</a>
		<br />
		<asp:Image ID="Image2" SkinID="Bullet" runat="server" /><a id="A3" href="2008/March08.aspx">March, 2008</a>
		<br />
			    <asp:Image ID="Image5" SkinID="Bullet" runat="server" /><a id="A4" href="2008/April08.aspx">April, 2008</a>
			            <br />
        <asp:Image ID="Image7" SkinID="Bullet" runat="server" /><a id="A5" href="2008/May08.aspx">May, 2008</a>


</span>
	</td>
  </tr>
</table>
</td>
			
          <td id="_sbCell" align="left" valign="top" class="body" background="images/secondary_bodybround.jpg"><img src="images/clear_spacer.gif" height="44" /><br />			
    
    
<!-- content goes here -->
<!------------------------------------>  
 <table width="100%">
  <tr>
	<td align="left"><asp:Image ID="Image6" SkinID="Title_Blog" runat="server" /></td>
	<td align="right"></td>
	<td align="right"></td> 	 
  </tr>  
</table>
<span id="_blogTitle" class="BlogTitle"> 
<div class="header">
	<div>
		<a id="Header1_HeaderTitle" class="headermaintitle" href="Default.aspx">Life In Code</a>&nbsp;
		<a id="Header1_XMLLink" href="rss.xml"><asp:Image ID="RssImage" SkinID="Rss" runat="server" /></a> 
    </div>		
</div>	
</span>
<br/>
<br />
<asp:Label ID="Label1" runat="server" Text="Name"></asp:Label>
              &nbsp; &nbsp; &nbsp; &nbsp;<asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
              <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ErrorMessage="Please Enter Your Name" ControlToValidate="TextBox1"></asp:RequiredFieldValidator><br />
<br />
<asp:Label ID="Label2" runat="server" Text="Email"></asp:Label>
              &nbsp; &nbsp; &nbsp; &nbsp;<asp:TextBox ID="TextBox2" runat="server" BackColor="White" BorderColor="White" ForeColor="Black"></asp:TextBox>            
              <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="TextBox2"
                  ErrorMessage="Please Enter Your Email"></asp:RequiredFieldValidator><br />
<br />             
 <asp:Label ID="Label3" runat="server" Text="Message"></asp:Label>
              <asp:TextBox ID="TextBox3" runat="server" Height="102px" TextMode="MultiLine" Width="242px"></asp:TextBox>
               <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ErrorMessage="Please Enter A Message" Width="136px" Height="8px" ControlToValidate="TextBox3"></asp:RequiredFieldValidator> 
 <br />
 <br /> 
 <asp:Button ID="Button1" runat="server" Text="Send" OnClick="Button1_Click"></asp:Button>

<!------------------------------------>
<!-- end of content -->

	  </td>

          <td id="_srCell" width="46" align="left" valign="top" background="images/secondary_right.jpg">&nbsp;</td>
          </tr>
      </table><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr> 
          <td width="44" align="left" valign="top">&nbsp;</td>
          <td width="136" align="left" valign="top"><img src="images/secondary_bottom_left.gif" id="_img4" width="140" height="20" /></td>
          <td id="_sbcCell" align="left" valign="top" background="images/secondary_bottom_center.gif">&nbsp;</td>

          <td width="46" align="left" valign="top"><img src="images/secondary_bottom_right.gif" id="_img6" width="63" height="20" /></td>
        </tr>
      </table>
          
          
    </form>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
    © 2008 Sphinx Logic

</body>
</html>
