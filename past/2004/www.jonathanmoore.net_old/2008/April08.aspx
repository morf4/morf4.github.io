<%@ Page Language="C#" AutoEventWireup="true" CodeFile="April08.aspx.cs" Inherits="April08" Theme="Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">
    <meta name="msvalidate.01" content="43838E6F172B45D69EB1B1BAC4AD6BA2" />
    <title>www.jonathanmoore.net</title>
        
</head>
<body id="_body" leftmargin="0" topmargin="0" background="../images/background.jpg">
   <form  method="post"  id="Form1" runat="server">       
    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr> 
        <td>
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
        <td width="0" align="left" valign="bottom"><a href="../contact.aspx" id=""><img src="../images/contact_up.gif" id="" alt="Contact" name="" border="0" class="HeadHome"/></a></td>
        <td width="228" align="right" valign="top"><asp:Image ID="Image3" SkinID="Logo" runat="server" /></td>
        </tr>
   </table>
    </td>
	</tr>
  <tr> 
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr> 
    <td width="44" align="left" valign="top"><img src="../images/secondary_left_long.jpg" id="_img1" width="44" height="665" /></td>
    <td id="_snbCell" width="136" align="left" valign="top" background="../images/secondary_nav_bround_long.jpg"><img src="../images/clear_spacer.gif" id="_img2" width="136" height="76" /><br />
<table width="111" border="0" cellspacing="0" cellpadding="0">
  <tr>
	<td>
<span class="Nav">

		Archives<br />
		
		 <asp:Image ID="Image1" SkinID="Bullet" runat="server" /><a id="" href="Jan08.aspx">Jan, 2008</a>
		 <br />
		<asp:Image ID="Image4" SkinID="Bullet" runat="server" /><a id="A1" href="Feb08.aspx">Feb, 2008</a>
		<br />
		<asp:Image ID="Image2" SkinID="Bullet" runat="server" /><a id="A3" href="March08.aspx">March, 2008</a>
	    <br />
	    <asp:Image ID="Image5" SkinID="Bullet" runat="server" /><a id="A2" href="April08.aspx">April, 2008</a>
	    <br />
        <asp:Image ID="Image7" SkinID="Bullet" runat="server" /><a id="A4" href="May08.aspx">May, 2008</a>

	<br />
	
</span>
	</td>
  </tr>
</table>
</td>
			
          <td id="_sbCell" align="left" valign="top" class="body" background="../images/secondary_bodybround.jpg"><img src="../images/clear_spacer.gif" height="44" /><br />			
    
    
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
		<a id="Header1_HeaderTitle" class="headermaintitle" href="../default.aspx">Life In Code</a>&nbsp;
		<a id="Header1_XMLLink" href="rss.xml"><asp:Image ID="RssImage" SkinID="Rss" runat="server" /></a> 
    </div>		
</div>	
</span>
<br />
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="../images/dotted_line_repeat.gif"><img src="../images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		April 3, 2008	  
</h1>		
     The Sphinx Logic site is currently under development using Silverlight 2 beta 1.
     By the time its done 2.0 should be released. An issue with the Silverlight class 
     HTMLWindow came up. So I emailed Scott Guthrie and Wilco Bauwer at Microsoft for some help.
     Even though HTMLWindow has a Navigate method defined, you must use HtmlPage.Window.Navigate("www.jonathanmoore.net");
     to get the link to work. This is in C# by the way. Thanks guys!
     <br />
     <br />
<table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="../images/dotted_line_repeat.gif"><img src="../images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		April 9, 2008	  
</h1>		
     I missed an IEEE meeting on the 8th due to a prior commitment. Sorry. The Sphinx Logic Framework now has 
     five namspaces and ten classes. So its pretty much ready for a 1.0 release, just waiting on 
     Silverlight 2.0 to be released because there are some Silverlight controls in it. The new site will be using Silverlight
     and the Sphinx Logic Framework as well as AJAX. The AJAX toolkit that is. I'm really glad that Silverlight is a 
     fresh alterative to Flash because I've been using Flash for years. And I like the fact I can open the same solution
     in Visual Studio and in Expression Blend. Of course the new site will be done using ASP.NET Also think of
     the Sphinx Logic Framework as extensions to the .NET Framework. I might demo some of it in the next post. 
     Happy coding, bye.
      <br/>
  <br/>
 <table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="../images/dotted_line_repeat.gif"><img src="../images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		April 10, 2008	  
</h1>
Working on a video tutorial for the Sphinx Logic Framework. Also learning how to use Sandcastle.
The SDK will contain videos as well. I thought about adding a tutorial section on the new web site
but decided in the end to contain them in the SDK. An update to this post heres the video.
<a href = "http://www.sphinxlogic.com/downloads/Controls_Demo.wmv">Watch the Video</a>&nbsp;&nbsp;
 <a href = "http://www.sphinxlogic.com/downloads/Controls_Demo.zip">Download the Video</a>
  <br/>
  <br/>
 <table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="../images/dotted_line_repeat.gif"><img src="../images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		April 14, 2008	  
</h1>
Hope you have enjoyed the video. Just was told that the facebook SDK contains the "Toolbox Controls Intaller"
so you can still download "Supernova" and it should work. Because that is what I used in the demo.
again heres the link ->	<a href = "http://www.sphinxlogic.com/downloads/Supernova.msi">code name "Supernova"</a>

<br/>
  <br/>
 <table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="../images/dotted_line_repeat.gif"><img src="../images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		April 19, 2008	  
</h1>
I've created a news section in the new site. The blog will still be there and allow me not to be so Tech all the time.
Also there will be two RSS feeds. Also It will support most browsers including Firefox. Installed Fedora on a box, the 
Compiz Fusion effects are pretty cool.  
<br/>
  <br/>
 <table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="../images/dotted_line_repeat.gif"><img src="../images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		April 20, 2008	  
</h1>
The "About" section and the "Search" section are about to be removed. The search will be featured on the 
Sphinx Logic site as you have seen. And over the next few days I will be working on the RSS feed. Also making sure 
everything renders properly in Firefox. IE and Safari work just fine. Then its time to start the migration. 
<br/>
  <br/>
 <table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="../images/dotted_line_repeat.gif"><img src="../images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		April 21, 2008	  
</h1>
Finished the blog site update sooner than expected. Now its time to merge the blog site to the Sphinx Logic 
database so that it will generate the RSS feed and the blog. It will be easier to maintain.
<br/>
  <br/>
 <table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="../images/dotted_line_repeat.gif"><img src="../images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		April 26, 2008	  
</h1>
<img src="../images/eye.jpg" />
<br />
<br />
<img src="../images/reason.jpg" />
<br />
<br />
<img src="../images/rosario.jpg" />
<br />
<br />
As many of you may know Triple J is one of my favorite radio stations from Australia.
So check them out. -> <a href = "http://www.triplej.net.au">Triple J</a> I'm Going to setup a Windows Server 2008 
server in May. So we will see.... 
<br/>
  <br/>
 <table width="100%"  border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td background="../images/dotted_line_repeat.gif"><img src="../images/clear_spacer.gif" width="521" height="4" /></td>
  </tr>
</table>		
<h1 class = "datetitle">
		April 27, 2008	  
</h1>
Started to add XML Documentation Comments to the framework code for use with Sandcastle.
You can download Sandcastle <a href = "http://www.sandcastledocs.com">here</a>
<br />
<br />
<a href="../images/nin.jpg"> 
<img src="../images/nin_thumb.jpg" border="0"> </a>

<!------------------------------------>
<!-- end of content -->

	 </td>

          <td id="_srCell" width="46" align="left" valign="top" background="../images/secondary_right.jpg">
              &nbsp;</td>
          </tr>
      </table><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr> 
          <td width="44" align="left" valign="top">&nbsp;</td>
          <td width="136" align="left" valign="top"><img src="../images/secondary_bottom_left.gif" id="_img4" width="140" height="20" /></td>
          <td id="_sbcCell" align="left" valign="top" background="../images/secondary_bottom_center.gif">
              &nbsp;</td>

          <td width="46" align="left" valign="top"><img src="../images/secondary_bottom_right.gif" id="_img6" width="63" height="20" /></td>
        </tr>
      </table>         
    </form>
    
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
    © 2008 Sphinx Logic
    
   
    
</body>
</html>

