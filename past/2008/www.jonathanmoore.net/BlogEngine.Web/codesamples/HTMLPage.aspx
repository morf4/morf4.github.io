<%@ Page Language="C#" AutoEventWireup="true" CodeFile="HTMLPage.aspx.cs" Inherits="codesamples_HTMLPage" %>
<%@ Import Namespace="BlogEngine.Core" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphBody" runat="Server">
 <div id="HTMLPage">
    <div id="divForm" runat="server">
    <h1>Here's how to use the Navigate method</h1>
    <br />
   <pre class="code"><span style="color: blue">private void </span>Blogs_Path_MouseLeftButtonDown(<span style="color: blue">object </span>sender,</pre>

<pre class="code"> <span style="color: #2b91af">MouseButtonEventArgs </span>e)
       {
           <span style="color: #2b91af">Uri </span>uri = <span style="color: blue">new </span><span style="color: #2b91af">Uri</span>(<span style="color: #a31515">&quot;<a title="http://www.YOURDOMAIN.com" href="http://www.YOURDOMAIN.com">http://www.YOURDOMAIN.com</a>&quot;</span>);
           <span style="color: #2b91af">HtmlPage</span>.Window.Navigate(uri);

       }</pre>

    </div>
    <br />
    <br />
    Very simple. Also be sure to use the namespace System.Windows.Browser. 
    
    This was the codebehind of a XAML file. In Silverlight 2.
    </div>
</asp:Content>

