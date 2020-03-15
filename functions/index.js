const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require('cors')({
  origin: true,
});

exports.emailMessage = functions.https.onRequest((req, res) => {
  const {firstname, lastname, dateofbirth, summary, email} = req.body;
  return cors(req, res, () => {
    try {
      var text = `<div>
      <h4>Information</h4>
      <ul><li>
          First Name:  ${firstname || ''}
        </li><li>
          Last Name:  ${lastname || ''}
        </li><li>
          Date of Birth: - ${dateofbirth || ''}
        </li>
          </ul>
      <h4>Summary</h4>
      <p>${summary || ''}</p>
    </div>`;
      var sesAccessKey = 'eneamunwe@gmail.com';
      var sesSecretKey = 'ENEA@flashde123';

      var transporter = nodemailer.createTransport(
        smtpTransport({
          service: 'gmail',
          auth: {
            user: sesAccessKey,
            pass: sesSecretKey,
          },
        }),
      );
      const mailOptions = {
        to: email,
        from: 'eneamunwe@gmail.com',
        subject: `${firstname} Test App`,
        text: text,
        html: text,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error.message);
        }
        res.status(200).send({
          message: 'success',
        });
      });
    } catch (error) {
      res.status(500).send('error');
    }
  });
});
