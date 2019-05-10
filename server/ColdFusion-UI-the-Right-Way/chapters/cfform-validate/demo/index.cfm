<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=1024" />
    <title>CFFORM - VALIDATE</title>
    <link rel="stylesheet" type="text/css" href="css/custom.css">
    <script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" src="js/jquery.validate.min.js"></script>
</head>
<body>
<cfoutput>
    <cfif IsDefined("FORM.submitit")>
        <cfdump var="#form#"><br>
    </cfif>
    <form id="myform" name="myform" action="index.cfm" enctype="multipart/form-data" method="post">
        <ul>
            <li>Validation Type:</li>
            <li>
                <input id="radValidationType" name="radValidationType" type="radio" value="manual" checked>Manual
                <input id="radValidationType" name="radValidationType" type="radio" value="JV">JV (jQuery Validation)
            </li>
            <li>Name:</li>
            <li><input id="name" name="name" type="text" size="25"></li>
            <li>E-mail:</li>
            <li><input id="email" name="email" type="text" size="25"></li>
            <li>Password:</li>
            <li><input id="password1" name="password1" type="password" size="25"></li>
            <li>Reenter password:</li>
            <li><input id="password2" name="password2" type="password" size="25"></li>
            <li><input id="submitit" name="submitit" type="submit"></li>
        </ul>
    </form>
</cfoutput>
</body>
<footer>
    <script type="text/javascript" src="js/main.js"></script>
</footer>
</html>

