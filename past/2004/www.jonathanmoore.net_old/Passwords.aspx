<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Passwords.aspx.cs" Inherits="Passwords" %>

<html>

<head>
</head>
<body topmargin="0" leftmargin="0">

<ASP:Repeater id="MyRepeater" runat="server">

      <HeaderTemplate>

        <table width="100%" style="font: 8pt verdana">
          <tr style="background-color:DFA894">
            <th>
              Site
            </th>
            <th>
              User ID
            </th>
            <th>
             Password
            </th>
            <th>
            URL
            </th>           
          </tr>

      </HeaderTemplate>

      <ItemTemplate>

        <tr style="background-color:FFECD8">
          <td>
            <%# DataBinder.Eval(Container.DataItem, "Site") %>
          </td>
          <td>
            <%# DataBinder.Eval(Container.DataItem, "UserName") %>
          </td>
          <td>
            <%# DataBinder.Eval(Container.DataItem, "Password") %>
          </td>
          <td>
             <%# DataBinder.Eval(Container.DataItem, "URL") %>
          </td>
          
        </tr>

      </ItemTemplate>

      <FooterTemplate>

        </table>

      </FooterTemplate>

  </ASP:Repeater>


</body>
</html>
