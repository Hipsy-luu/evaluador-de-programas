export const email = 
'<!DOCTYPE html>'+
'<html lang="en">'+
'<head>'+
    '<meta charset="UTF-8">'+
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
    '<title>Document</title>'+
    '<style>'+
        'body, p{'+
            'margin: 0;'+
        '}'+
        '.main{'+
            'width: 100%;'+
            'height: 100vh;'+
            'background-color: #282e38;'+
            'position: relative;'+
        '}'+
        '.structure{'+
            'position: relative;'+
            'background-color: white;'+
            'max-width: 650px;'+
            'width: 100%;'+
            'height: 100%;'+
            'margin: auto;'+
        '}'+
        '.head{'+
            'height: 15%;'+
        '}'+
        '.body{'+
            'text-align: center;'+
            'font-size: larger;'+
            'max-height: 100%;'+
            'height: auto;'+
            'padding: 0 30px;'+
        '}'+
        '.footer{'+
            'position: absolute;'+
            'bottom: 0;'+
            'left: 0;'+
            'background-color: #4892a9;'+
            'height: 70px;'+
            'color: white;'+
            'text-align: center;'+
            'padding: 30px;'+
            'font-size: medium;'+
        '}'+
        'img{'+
            'max-height: 60px;'+
            'height: 100%;'+
            'width: 100%;'+
        '}'+
        'table{'+
            'width: 100%;'+
            'padding: 10px 30px;'+
        '}'+
        '.descriptive-img{'+
            'max-height: 200px;'+
            'height: 100%;'+
            'width: 100%;'+
        '}'+
        '@media screen and ( max-width: 375px){'+
''+
'            '+
        '}'+
    '</style>'+
'</head>'+
'<body>'+
    '<div class="main">'+
        '<div class="structure">'+
            '<div class="head">'+
                '<table>'+
                    '<tr>'+
                        '<td style="width: 40%;">'+
                            '<img src="https://evaluadorp.web.app/assets/emails/images/gobierno.svg"> '+
                        '</td>'+
                        '<td style="width: 60%; text-align: end;">'+
                            '<img src="https://evaluadorp.web.app/assets/emails/images/unidos.svg">'+
                        '</td>'+
                    '</tr>'+
                '</table>'+
            '</div>'+
            '<div class="body">'+
                '<h2 style="padding-top: 20px;">Acuse de validaciones</h1>'+
                '<p style="padding-top: 40px;">Este correo tiene como fin informar acerca del comprobante de validación, para acceder a esta información favor de descargar el archivo que se encuentra anexado a este correo</p>'+
                '<img class="descriptive-img" style="padding-top: 60px;" src="https://evaluadorp.web.app/assets/emails/images/files.svg">'+
            '</div>'+
            '<div class="footer">'+
                '<p>Este correo tiene como único propósito el de informar acerca del estado de validación, favor de no responder a este correo en caso de dudas.</p>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</body>'+
'</html>';