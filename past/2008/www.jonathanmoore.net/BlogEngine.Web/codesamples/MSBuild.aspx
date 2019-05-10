<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MSBuild.aspx.cs" Inherits="codesamples_MSBuild" %>
<%@ Import Namespace="BlogEngine.Core" %>

<asp:Content ID="Content1" ContentPlaceHolderID="cphBody" runat="Server">
 <div id="HTMLPage">
    <div id="divForm" runat="server">
    <h1>MSBuild Console App</h1>
<br />
<br />

  <pre class="code"><span style="color: blue">using </span>System;
<span style="color: blue">using </span>System.Collections.Generic;
<span style="color: blue">using </span>System.Text;
<span style="color: blue">using </span>Microsoft.Build.BuildEngine;

<span style="color: blue">namespace </span>MSbuildproj
{
    <span style="color: blue">class </span><span style="color: #2b91af">Program
    </span>{
        [<span style="color: #2b91af">STAThread</span>]
        <span style="color: blue">static void </span>Main(<span style="color: blue">string</span>[] args)
        {
            <span style="color: green">// Instantiate a new Engine object
            </span><span style="color: #2b91af">Engine </span>engine = <span style="color: blue">new </span><span style="color: #2b91af">Engine</span>();

            <span style="color: green">// Point to the path that contains the .NET Framework 3.5 tools
            </span>engine.BinPath = <span style="color: #a31515">@&quot;c:\windows\microsoft.net\framework\v3.5&quot;</span>;


            <span style="color: green">// Instantiate a new FileLogger to generate build log
            </span><span style="color: #2b91af">FileLogger </span>logger = <span style="color: blue">new </span><span style="color: #2b91af">FileLogger</span>();

            <span style="color: green">// Set the logfile parameter to indicate the log destination
            </span>logger.Parameters = <span style="color: #a31515">@&quot;logfile=build.log&quot;</span>;

            <span style="color: green">// Register the logger with the engine
            </span>engine.RegisterLogger(logger);

            <span style="color: green">// Build a project file
            </span><span style="color: blue">bool </span>success = engine.BuildProjectFile(<span style="color: #a31515">@&quot;C:\build.proj&quot;</span>);
            

            <span style="color: green">//Unregister all loggers to close the log file
            </span>engine.UnregisterAllLoggers();

            <span style="color: blue">if </span>(success)
                <span style="color: #2b91af">Console</span>.WriteLine(<span style="color: #a31515">&quot;Build succeeded.&quot;</span>);
            <span style="color: blue">else
            </span><span style="color: #2b91af">Console</span>.WriteLine(<span style="color: #a31515">&quot;Build failed. View build.log for details&quot;</span>);
            <span style="color: #2b91af">Console</span>.Read();

            

        }
    }
}</pre>
<br />
<br />
You also need a App.config file in the solution. And here is that markup.
<br />
<br /> 
<pre class="code"><span style="color: blue">&lt;?</span><span style="color: #a31515">xml </span><span style="color: red">version</span><span style="color: blue">=</span>&quot;<span style="color: blue">1.0</span>&quot; <span style="color: red">encoding</span><span style="color: blue">=</span>&quot;<span style="color: blue">utf-8</span>&quot; <span style="color: blue">?&gt;
&lt;</span><span style="color: #a31515">configuration</span><span style="color: blue">&gt;
  &lt;</span><span style="color: #a31515">configSections</span><span style="color: blue">&gt;
    &lt;</span><span style="color: #a31515">section </span><span style="color: red">name</span><span style="color: blue">=</span>&quot;<span style="color: blue">msbuildToolsets</span>&quot; 
    <span style="color: red">type</span><span style="color: blue">=</span>&quot;<span style="color: blue">Microsoft.Build.BuildEngine.ToolsetConfigurationSection,</span></pre>

<pre class="code"><span style="color: blue"></span><span style="color: blue">Microsoft.Build.Engine, Version=3.5.0.0, 
Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a</span>&quot; <span style="color: blue">/&gt;
  &lt;/</span><span style="color: #a31515">configSections</span><span style="color: blue">&gt;
  &lt;</span><span style="color: #a31515">startup</span><span style="color: blue">&gt;
    &lt;</span><span style="color: #a31515">supportedRuntime </span><span style="color: red">version</span><span style="color: blue">=</span>&quot;<span style="color: blue">v2.0.50727</span>&quot; <span style="color: red">safemode</span><span style="color: blue">=</span>&quot;<span style="color: blue">true</span>&quot;<span style="color: blue">/&gt;
    &lt;</span><span style="color: #a31515">requiredRuntime </span><span style="color: red">version</span><span style="color: blue">=</span>&quot;<span style="color: blue">v2.0.50727</span>&quot; <span style="color: red">safemode</span><span style="color: blue">=</span>&quot;<span style="color: blue">true</span>&quot;<span style="color: blue">/&gt;
  &lt;/</span><span style="color: #a31515">startup</span><span style="color: blue">&gt;
  &lt;</span><span style="color: #a31515">runtime</span><span style="color: blue">&gt;
    &lt;</span><span style="color: #a31515">assemblyBinding </span><span style="color: red">xmlns</span><span style="color: blue">=</span>&quot;<span style="color: blue">urn:schemas-microsoft-com:asm.v1</span>&quot;<span style="color: blue">&gt;
      &lt;</span><span style="color: #a31515">dependentAssembly</span><span style="color: blue">&gt;
        &lt;</span><span style="color: #a31515">assemblyIdentity </span><span style="color: red">name</span><span style="color: blue">=</span>&quot;<span style="color: blue">Microsoft.Build.Framework</span>&quot; 
        <span style="color: red">publicKeyToken</span><span style="color: blue">=</span>&quot;<span style="color: blue">b03f5f7f11d50a3a</span>&quot; </pre>

<pre class="code">         <span style="color: red">culture</span><span style="color: blue">=</span>&quot;<span style="color: blue">neutral</span>&quot;<span style="color: blue">/&gt;
        &lt;</span><span style="color: #a31515">bindingRedirect </span><span style="color: red">oldVersion</span><span style="color: blue">=</span>&quot;<span style="color: blue">0.0.0.0-99.9.9.9</span>&quot; <span style="color: red">newVersion</span><span style="color: blue">=</span>&quot;<span style="color: blue">3.5.0.0</span>&quot;<span style="color: blue">/&gt;
      &lt;/</span><span style="color: #a31515">dependentAssembly</span><span style="color: blue">&gt;
    &lt;/</span><span style="color: #a31515">assemblyBinding</span><span style="color: blue">&gt;
  &lt;/</span><span style="color: #a31515">runtime</span>
  
<span style="color: #a31515">configuration</span><span style="color: blue">&gt;
</span></pre>

</div>
     </div>
</asp:Content>

