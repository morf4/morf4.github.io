<%@ Page Language="C#" AutoEventWireup="true" CodeFile="InkPresenter.aspx.cs" Inherits="codesamples_InkPresenter" %>
<%@ Import Namespace="BlogEngine.Core" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphBody" runat="Server">
 <div id="HTMLPage">
    <div id="divForm" runat="server">
    <h1>Using InkPresenter</h1>
<br />
First you must have Silverlight 2 beta 2 with the Visual Studio tools installed.
Next create a Silverlight Application in Visual Studio. Here is the Page.xaml file.
<br />
<br />
<pre class="code"><span style="color: blue">&lt;</span><span style="color: #a31515">UserControl </span><span style="color: red">x</span><span style="color: blue">:</span><span style="color: red">Class</span><span style="color: blue">=&quot;SilverlightApplication1.Page&quot;
    </span><span style="color: red">xmlns</span><span style="color: blue">=&quot;http://schemas.microsoft.com/winfx/2006/xaml/presentation&quot; 
    </span><span style="color: red">xmlns</span><span style="color: blue">:</span><span style="color: red">x</span><span style="color: blue">=&quot;http://schemas.microsoft.com/winfx/2006/xaml&quot; 
    </span><span style="color: red">Width</span><span style="color: blue">=&quot;400&quot; </span><span style="color: red">Height</span><span style="color: blue">=&quot;300&quot;&gt;
    &lt;</span><span style="color: #a31515">Grid </span><span style="color: red">x</span><span style="color: blue">:</span><span style="color: red">Name</span><span style="color: blue">=&quot;LayoutRoot&quot; </span><span style="color: red">Background</span><span style="color: blue">=&quot;Blue&quot;&gt;
        &lt;</span><span style="color: #a31515">InkPresenter 
            </span><span style="color: red">x</span><span style="color: blue">:</span><span style="color: red">Name</span><span style="color: blue">=&quot;inkCtrl&quot;
            </span><span style="color: red">Cursor</span><span style="color: blue">=&quot;Stylus&quot;
            </span><span style="color: red">Background</span><span style="color: blue">=&quot;transparent&quot; </span><span style="color: red">Width</span><span style="color: blue">=&quot;800&quot; </span><span style="color: red">Height</span><span style="color: blue">=&quot;400&quot; 
            </span><span style="color: red">Margin</span><span style="color: blue">=&quot;8,8,17,0&quot; </span><span style="color: red">VerticalAlignment</span><span style="color: blue">=&quot;Top&quot;
            </span><span style="color: red">MouseLeftButtonDown </span><span style="color: blue">=&quot;inkPresenterElement_MouseLeftButtonDown&quot;
            </span><span style="color: red">MouseMove</span><span style="color: blue">=&quot;inkPresenterElement_MouseMove&quot;
            </span><span style="color: red">MouseLeftButtonUp</span><span style="color: blue">=&quot;inkPresenterElement_MouseLeftButtonUp&quot; /&gt;

    &lt;/</span><span style="color: #a31515">Grid</span><span style="color: blue">&gt;
&lt;/</span><span style="color: #a31515">UserControl</span><span style="color: blue">&gt;
</span></pre>

<br />
<br />
And here is the codebehind, the Page.xaml.cs
<pre class="code"><span style="color: blue">using </span>System;
<span style="color: blue">using </span>System.Collections.Generic;
<span style="color: blue">using </span>System.Net;
<span style="color: blue">using </span>System.Windows;
<span style="color: blue">using </span>System.Windows.Controls;
<span style="color: blue">using </span>System.Windows.Documents;
<span style="color: blue">using </span>System.Windows.Input;
<span style="color: blue">using </span>System.Windows.Media;
<span style="color: blue">using </span>System.Windows.Media.Animation;
<span style="color: blue">using </span>System.Windows.Shapes;
<span style="color: blue">using </span>System.Windows.Ink;

<span style="color: blue">namespace </span>SilverlightApplication1
{
    <span style="color: blue">public partial class </span><span style="color: #2b91af">Page </span>: <span style="color: #2b91af">UserControl
    </span>{
        <span style="color: blue">private </span><span style="color: #2b91af">Stroke </span>newStroke = <span style="color: blue">null</span>;
        
        <span style="color: blue">public </span>Page()
        {
            InitializeComponent();
        }

        <span style="color: blue">private void </span>inkPresenterElement_MouseLeftButtonDown(<span style="color: blue">object </span>sender, 
        <span style="color: #2b91af">MouseButtonEventArgs </span>e)
        {
            <span style="color: green">// capture mouse and create a new stroke

            </span>inkCtrl.CaptureMouse();
            newStroke = <span style="color: blue">new </span><span style="color: #2b91af">Stroke</span>();
            inkCtrl.Strokes.Add(newStroke);

 

            <span style="color: green">// set the desired drawing attributes here

            </span>newStroke.DrawingAttributes.Color = <span style="color: #2b91af">Colors</span>.Black;
            <span style="color: green">//newStroke.DrawingAttributes.OutlineColor = Colors.Yellow;
            </span>newStroke.DrawingAttributes.Width = 6d;
            newStroke.DrawingAttributes.Height = 6d; 

            <span style="color: green">// add the stylus points
      </span>newStroke.StylusPoints.Add(e.StylusDevice.GetStylusPoints(inkCtrl));

          }       

        <span style="color: blue">private void </span>inkPresenterElement_MouseMove(<span style="color: blue">object </span>sender,
         <span style="color: #2b91af">MouseEventArgs </span>e)
        {
            <span style="color: blue">if </span>(newStroke != <span style="color: blue">null</span>)

           {

                    <span style="color: green">// add the stylus points
      </span>newStroke.StylusPoints.Add(e.StylusDevice.GetStylusPoints(inkCtrl));

           }

        }

        <span style="color: blue">private void </span>inkPresenterElement_MouseLeftButtonUp(<span style="color: blue">object </span>sender,
         <span style="color: #2b91af">MouseButtonEventArgs </span>e)
        {
            <span style="color: blue">if </span>(newStroke != <span style="color: blue">null</span>)
            {

                <span style="color: green">// add the stylus points
       </span>newStroke.StylusPoints.Add(e.StylusDevice.GetStylusPoints(inkCtrl));


            }

            <span style="color: green">// release mouse capture and we are done
            </span>inkCtrl.ReleaseMouseCapture();
            newStroke = <span style="color: blue">null</span>;


        }
        
    }
}</pre>

<br />
<br />
You can also download the code -> <a href = "http://www.sphinxlogic.com/downloads/silverlightink.zip">here</a>
 </div>
     </div>
</asp:Content>