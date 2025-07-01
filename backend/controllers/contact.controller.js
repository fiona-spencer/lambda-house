const Contact = require('../models/Contact');
const { sendMail } = require('../utils/SendMail.js'); // Optional

exports.submitContact = async (req, res) => {
  try {
    const contactData = req.body;

    const contact = new Contact(contactData);
    await contact.save();

    // Optionally, send email to admin
    await sendMail({
      type: 'contact',
      from: contactData.email,
      subject: `Contact Form: ${contactData.subject}`,
      html: `
        <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone}</p>
        <p><strong>Message:</strong><br>${contactData.message}</p>
      `,
      text: contactData.message
    });

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (err) {
    console.error('Error submitting contact:', err);
    res.status(500).json({ message: 'Failed to submit contact form.' });
  }
};
