<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Default" Theme="Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <meta name="msvalidate.01" content="43838E6F172B45D69EB1B1BAC4AD6BA2" />
    <title>www.jonathanmoore.net</title>
        
</head>
<body id="_body" leftmargin="0" topmargin="0" background="images/background.jpg">
   <form  method="post"  id="Form1" runat="server">       
    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr> 
        <td>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
        <td width="0" align="left" valign="bottom"><a href="contact.aspx" id=""><img src="images/contact_up.gif" id="" alt="Contact" name="" border="0" class="HeadHome"/></a></td>
        <td width="228" align="right" valign="top"><asp:Image ID="Image3" SkinID="Logo" runat="server" /></td>
        </tr>
   </table>
    </td>
	</tr>
  <tr> 
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr> 
    <td width="44" align="left" valign="top"><img src="images/secondary_left_long.jpg" id="_img1" width="44" height="665" /></td>
    <td id="_snbCell" width="136" align="left" valign="top" background="images/secondary_nav_bround_long.jpg"><img src="images/clear_spacer.gif" id="_img2" width="136" height="76" /><br />
<table width="111" border="0" cellspacing="0" cellpadding="0">
  <tr>
	<td>
<span class="Nav">

		Archives<br />
		
		 <asp:Image ID="Image1" SkinID="Bullet" runat="server" /><a id="" href="2008/Jan08.aspx">Jan, 2008</a>
		 <br />
		<asp:Image ID="Image4" SkinID="Bullet" runat="server" /><a id="A1" href="2008/Feb08.aspx">Feb, 2008</a>
		<br />
		<asp:Image ID="Image2" SkinID="Bullet" runat="server" /><a id="A3" href="2008/March08.aspx">March, 2008</a>
	    <br />
	    	    <asp:Image ID="Image5" SkinID="Bullet" runat="server" /><a id="A2" href="2008/April08.aspx">April, 2008</a>
	    	            <br />
        <asp:Image ID="Image7" SkinID="Bullet" runat="server" /><a id="A4" href="2008/May08.aspx">May, 2008</a>


	<br />
	
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
		<a id="Header1_HeaderTitle" class="headermaintitle" href="default.aspx">Life In Code</a>&nbsp;
		<a id="Header1_XMLLink" href="rss.xml"><asp:Image ID="RssImage" SkinID="Rss" runat="server" /></a> 
    </div>		
</div>	
</span>
<br />
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="images/dotted_line_repeat.gif"><img src="images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		June 5, 2008	  
</h1>
I've started the legal process such as licensing,tradmarks and product copyrights as well as intellectual property.
When I first started I wanted the Sphinx Logic site to be a tutorial site but later decided to put all tutorials,
sample code and how to.. videos in an SDK. Also the framework will not be open source. I'm working on a good business
model and things are moving in a positive and lucrative direction. Sphinx Logic will still support the open source
community, but there must be a line drawn to be profitable. Some Sphinx Logic projects will be open source others will
not. Some online companies are here one day and gone the next. This is because of bad planning and poor marketing.
I will start to unveil the site in July or August, but the site wont be fully in production untill the end of the year.
I will still post code on my blog. Maybe the open source projects will be on codeplex.  		
<br />
<br />
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="images/dotted_line_repeat.gif"><img src="images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		June 7, 2008	  
</h1> 
Added two new methods to the Contact class today. One was a constructor, which is not overloaded. So now you can create a Contact control directly
from C# code, but you still need to use a place holder control in your ASP.NET code so the control will be placed in a form tag.
Unless you generate the HTML. The goal for the end of the year is to have at least 30 to 35 classes in the framework.
I might show a video on how to create a Contact control from C# in my next post. I have so many ideas about future classes.
I just have to find to time to write them. There are still more methods that could be written in the current classes, so
theres' alot of work to be done. I'm following all current design guidlines and using FXCop on all assemblies. I'm also learning how to install
into the GAC during the setup, and the toolbox since the Visual Studio 2008 SDK does not come with the Toolbox controls installer anymore, you can make a package
but that has it's limitations.
<br />
<br />
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="images/dotted_line_repeat.gif"><img src="images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		June 8, 2008	  
</h1> 
BETA 2 IS OUT !! along with Expression Blend June Preview !! Download it <a href = "http://channel8.msdn.com/Posts/Blend-June-Preview-Silverlight-2-beta-2-Download-links/">here</a>
The upgrade was sooooo smooth. So you can guess what I'll be doing today. Working with Silverlight 2 Beta 2!!! I'll 
post a video tomorrow.
<br />
<br />
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="images/dotted_line_repeat.gif"><img src="images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		June 9, 2008	  
</h1>
I added a new class to the framework today a build class. And as promised here is a video 
of how create a Contact Control from C#. Using my framework.
 <a href = "http://www.sphinxlogic.com/downloads/ContactVideo.wmv">Watch the Video</a>&nbsp;&nbsp;
 <a href = "http://www.sphinxlogic.com/downloads/ContactVideo.zip">Download the Video</a>
 <br />
<br />
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="images/dotted_line_repeat.gif"><img src="images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		June 12, 2008	  
</h1>
I've decided to ink enable the new blog site. So I will be able write entries into the blog via my Tablet PC.
I've also decided to release some of the new Sphinx Logic site source. Which will include the ink feature.
My MSBuild process would not have been possible without the help of Sayed Hashimi so a big "Thank You" to him.
Download his project on codeplex -> <a href = "http://www.codeplex.com/Sedodream/SourceControl/ListDownloadableCommits.aspx">here</a>
I'm also debating weather or not to do the entire site in Silverlight 2. the only problem I see is can a canvas 
be resized to fit the entire browser window? Not fullscreen mind you, just the browser window. If your having the
same problem read this thread. <a href = "http://silverlight.net/forums/t/624.aspx">Here</a> Some of the code on that 
thread is in VB, but it's pretty simple to translate VB to C#. When I find a solution I'll post it. Another question,
can I use ink in Silverlight? I think so because I'll be using a multiline textbox for the input. So much work to do
have a good night, bye.
<br />
<br />
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="images/dotted_line_repeat.gif"><img src="images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		June 13, 2008	  
</h1>
As to my surprise there is a ink control in Expression Blend named InkPresenter, so I worked with that for Silverlight.
Here is how it works for Silverlight 2 beta 2. First you need Silverlight 2 beta 2 installed on your machine with the Visual
Studio tools installed as well. OK Create a new Silverlight application. Here is the Page.xaml file.
<pre style="BACKGROUND: #dddddd; WIDTH: 100%">
&lt;UserControl x:Class="SilverlightApplication1.Page"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation" 
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" 
    Width="400" Height="300"&gt;
    &lt;Grid x:Name="LayoutRoot" Background="Blue"&gt;
    	&lt;InkPresenter 
            x:Name="inkCtrl"
            Cursor="Stylus"
            Background="transparent" Width="800" Height="400" 
            Margin="8,8,17,0" VerticalAlignment="Top"
            MouseLeftButtonDown ="inkPresenterElement_MouseLeftButtonDown"
            MouseMove="inkPresenterElement_MouseMove"
            MouseLeftButtonUp="inkPresenterElement_MouseLeftButtonUp" /&gt;

    &lt;/Grid&gt;
&lt;/UserControl&gt;
</pre>
And here is the codebehind, the Page.xaml.cs
<pre style="BACKGROUND: #dddddd; WIDTH: 100%">
using System;
using System.Collections.Generic;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using System.Windows.Ink;

namespace SilverlightApplication1
{
    public partial class Page : UserControl
    {
        private Stroke newStroke = null;
        
        public Page()
        {
            InitializeComponent();
        }

        private void inkPresenterElement_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            // capture mouse and create a new stroke

            inkCtrl.CaptureMouse();
            newStroke = new Stroke();
            inkCtrl.Strokes.Add(newStroke);

 

            // set the desired drawing attributes here

            newStroke.DrawingAttributes.Color = Colors.Black;           
            newStroke.DrawingAttributes.Width = 6d;
            newStroke.DrawingAttributes.Height = 6d; 

            // add the stylus points
            newStroke.StylusPoints.Add(e.StylusDevice.GetStylusPoints(inkCtrl));

          }       

        private void inkPresenterElement_MouseMove(object sender, MouseEventArgs e)
        {
            if (newStroke != null)

                {

                    // add the stylus points
                    newStroke.StylusPoints.Add(e.StylusDevice.GetStylusPoints(inkCtrl));

                }

        }

        private void inkPresenterElement_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            if (newStroke != null)
            {

                // add the stylus points
                newStroke.StylusPoints.Add(e.StylusDevice.GetStylusPoints(inkCtrl));


            }

            // release mouse capture and we are done
            inkCtrl.ReleaseMouseCapture();
            newStroke = null;


        }
        
    }
}
</pre>
You can also download the code -> <a href = "http://www.sphinxlogic.com/downloads/silverlightink.zip">here</a>
 <br />
<br />
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="images/dotted_line_repeat.gif"><img src="images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		June 14, 2008	  
</h1>
<a href="images/IEEE0608.jpg"> 
<img src="images/IEEE0608.gif" border="0"> </a>

<br />
I emailed Scott Guthrie about the resizing on the browser window. He said just to remove the width 
a hieght attribute from your usercontrol element and it would auto-size to fit the page. Also if you 
have not joined the IEEE. Join!
<br />
<br />
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="images/dotted_line_repeat.gif"><img src="images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		June 17, 2008	  
</h1>
Started the migration of this blog to the sphinxlogic site. Soon jonathanmoore.net will point to 
the "jonahtanm" folder on shinxlogic.com. And as I've said in eailer posts I start to show you parts 
of the new site in July through December. The Web based HTML editor is not done yet. I took off the 
old beta because I knew it was going to be completly redone. One other note if your running Vista
you might have to temporally turn off the User Account Control feature to get the new silverlight 
plugin to install correctly. I'm not sure on XP or Apple's Leopard. The new blog will be driven by SQL.
And as always I love your feedback.
<!------------------------------------>
<!-- end of content -->

	 </td>

          <td id="_srCell" width="46" align="left" valign="top" background="images/secondary_right.jpg">
              &nbsp;</td>
          </tr>
      </table><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr> 
          <td width="44" align="left" valign="top">&nbsp;</td>
          <td width="136" align="left" valign="top"><img src="images/secondary_bottom_left.gif" id="_img4" width="140" height="20" /></td>
          <td id="_sbcCell" align="left" valign="top" background="images/secondary_bottom_center.gif">
              &nbsp;</td>

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

