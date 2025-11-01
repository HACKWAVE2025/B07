const cron = require("node-cron");
const Reminder = require("../models/Reminder");
const User = require("../models/user");
const Scheme = require("../models/Scheme");
const nodemailer = require("nodemailer");

//  Setup mail transporter (using Gmail as example)
const transporter = nodemailer.createTransport({
  service:process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your app password
  },
});

//  Run every min
cron.schedule("* * * * *", async () => {
  console.log("⏰ Checking reminders...");

  const now = new Date();

  // Find reminders due to send
  const reminders = await Reminder.find({
    reminderDate: { $lte: now },
    isSent: false,
  }).populate("userId schemeId");

  for (const reminder of reminders) {
    try {
      if (reminder.type ===process.env.EMAIL_SERVICE) {
        const userEmail = reminder.userId.email;
        const schemeTitle = reminder.schemeId.title;

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: userEmail,
          subject: `Reminder: ${schemeTitle}`,
          text: `Hey ${reminder.userId.name}, this is a reminder for the scheme: ${schemeTitle}. Check details on our platform.`,
        });
      }

      reminder.isSent = true;
      await reminder.save();

      console.log(`✅ Reminder sent for ${reminder.schemeId.title} to ${reminder.userId.email}`);
    } catch (err) {
      console.error("Error sending reminder:", err);
    }
  }
});