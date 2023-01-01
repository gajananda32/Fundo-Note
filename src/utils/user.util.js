const nodemailer= require('nodemailer');
const { google }= require('googleapis');

const CLIENT_ID='457914519046-grdk6d6db5m6o3iobp3i75o37opfd1i8.apps.googleusercontent.com';
const CLEINT_SECRET='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';
const REDIRET_URI='https://developers.google.com/oauthplayground';
const REFRESH_TOKEN='1//04yim1LIoCvgMCgYIARAAGAQSNwF-L9IrGaRTdPVPgGMdV6AsqDzkOr4Qg1UgmU3qDE7OSgn2JmGDETY3GYb-Lg8HqfxEiCR4ozE';

const oAuth2client=new google.auth.OAuth2(CLIENT_ID,CLEINT_SECRET,REDIRET_URI);
oAuth2client.setCredentials({refresh_token:REFRESH_TOKEN});

export const sendMail = async (emailID) => {
    try {
        const accessToken= await oAuth2client.getAccessToken()
        const transport=nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'gajanandarathod32@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLEINT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        });
        const mailoption={
            from:'Gajananda <gajanandarathod32@gmail.com>',
            to: emailID,
            subject:"Reset Password",
            text:'Reset your Password',
            html:'<h1>To Reset Your Password <a href="http://localhost:5000/api/v1/users/resetpassword"> Click Here </a></h1><h1>',
        };
        const result= await transport.sendMail(mailoption)
        return result;
        
    } catch (error) {
        return error;
        
    }

}
// sendmail().then(result=> console.log("email sent.....",result))
// .catch((error) => console.log(error.message));