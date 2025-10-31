


const nodemailer = require('nodemailer')


exports.contact =  async (req, res) => {
  try {
    const { fullName, email, phone, message, category } = req.body || {};

    // Basic validation
    if (!fullName || !email || !message || !category || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Configure transport (SMTP). Use your provider’s SMTP credentials.
   const PASS_KEY="nmmwmvouveigomfn"
   
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth:{
       user: 'harduragbemeei@gmail.com',
       pass: PASS_KEY
     },
     secure: true,
     port: 465
   })

    // Compose email to YOU
    const info = await transporter.sendMail({
      from: `"${fullName}" <${email}>`,
      to: 'olaoyeaisrael@gmail.com',                       // your inbox
      replyTo: email,                                         // so you can reply directly
      subject: `${category}`,
      text: `From: ${fullName} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${fullName} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${category || "(none)"} </p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, "<br/>")}</p>
        <p>Phone:</p>
        <p>${phone}</p>
        <p>Category:</p>
        <p>${category}</p>
      `,
    });

    return res.status(200).json({success: true, ok: true, id: info.messageId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to send message." });
  }
};

