<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ title }}</title>
    <style>
        body {
            margin: 30px;
        }
        a {
            display: block;
            font-size: 18px;
            line-height: 1.8;
            text-decoration: none;
            padding: 4px 0;
        }
        .dir-icon {
            background: #167ad1;
            border-radius: 4px;
            margin-right: 4px;
            color: #fff;  
            padding: 4px 10px; 
            font-size: 14px;
        }
        .file-icon {

        }
    </style>
</head>
<body>
{{#each files}}
    <a href="{{ ../dir }}/{{ file }}">
        <span class="dir-icon">{{ icon }}</span>
        {{ file }}
    </a>
{{/each}}
</body>
</html>