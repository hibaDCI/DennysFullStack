export const verify_message = (verify_link, name) => {
    return `
    
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body{
            background-color: whitesmoke;
        }
        .container{
            border: 1px solid black;
            width: 60vw;
            margin: auto;
            padding: 2rem 1rem;
        }

        #logo{
            margin: 1rem auto;
            text-align: center;
            color: coral;
            font-style: italic;
            font-size: 1.3rem;
        }

        #title{
            font-weight: 600;
            margin-bottom: 1.2rem;
            color: dimgray;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        p{
            color: dimgray;
            margin-bottom: 2rem;
            font-weight: 200;
            font-size: 0.9rem;
        }

        a{
            display: block;
            margin:auto;
            color: white;
            background-color: #017BFF;
            width: 13rem;
            text-align: center;
            padding: 1rem;
            text-decoration: none;
            border-radius: 5px;
            box-shadow: 2px 2px 5px black;
            font-weight: 500;
            font-size: 0.9rem;
        }

        a:hover{
            background-color: rgb(98, 139, 243);
        }


    </style>
</head>
<body>
    <div class="container">
        <h3 id="logo">JobPortal</h3>
        <h4 id="title">Hi User,</h4>
        <p>Thanks for creating a JobPortal account. Please verify your email address by clicking the button below.</p>
        <div>
            <a href="link">Verify email address</a>
        </div>
    </div>
</body>
</html>
    `
};