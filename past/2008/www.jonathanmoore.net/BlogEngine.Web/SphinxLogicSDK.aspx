<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SphinxLogicSDK.aspx.cs" Inherits="SphinxLogicSDK" %>

<%@ Import Namespace="BlogEngine.Core" %>
<asp:Content ID="Content1" ContentPlaceHolderID="cphBody" runat="Server">


<div>
    <h1>Sphinx Logic SDK</h1>
    <br />
    <br />
    <h3>System Requirements</h3>
    <br />
    <ul>
    <li>Windows Vista w/ Service Pack 1 </li>
    <li>Visual Studio 2008 all versions</li>
    <li>1.6 GHz processor or faster</li>
    <li>784MB of RAM or more</li>
    <li>5400 RPM Hard Drive</li>
    <li>1024x768 or higher resolution display</li>
    <li>10MB of free Hard Drive Space</li>
    </ul>
     <h3>
        Download The Latest Daily Build</h3>
    <p>
        The latest Sphinx Logic SDK from the automated build server.
    </p>
    <br />
    <b>Date:</b> &nbsp<%=System.DateTime.Today%> 
    <br />
    <br />
    
    <ul>
        <li><a href="http://www.sphinxlogic.com/Downloads/SphinxLogicSDK.msi">SphinxLogicSDK.msi</a> </li>
    </ul>
    <br />
    <br />
    <p>
    NOTE: Starting, this is a Alpha release it is by no means completed.
          Also please note that the User Accont Control Feature of Vista 
          must be turned off for the installer to install. This will be fixed 
          in future releases. Virtual Directory creation has also been removed.
          And has only been tested on Vista Ultimate and Business.  
    </p>
</div>
</asp:Content>
