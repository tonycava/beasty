import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: env.EMAIL_USER,
		pass: env.EMAIL_PASS
	}
});

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const firstName = data.get('firstName');
		const lastName = data.get('lastName');
		const email = data.get('email');
		const subject = data.get('subject');
		const message = data.get('message');

		try {
			const mailOptions = {
					from: env.EMAIL_USER,
					to: env.EMAIL_TO,
					subject: `Nouveau message de contact: ${subject}`,
					html: `
						<!DOCTYPE html>
						<html>
								<head>
										<style>
												body {
														font-family: Arial, sans-serif;
														line-height: 1.6;
														color: #333;
														max-width: 600px;
														margin: 0 auto;
														padding: 20px;
												}
												.header {
														background-color: #0F766E;
														color: white;
														padding: 20px;
														border-radius: 8px 8px 0 0;
														text-align: center;
												}
												.content {
														background-color: #fff;
														padding: 20px;
														border: 1px solid #ddd;
														border-radius: 0 0 8px 8px;
												}
												.footer {
														text-align: center;
														margin-top: 20px;
														color: #666;
														font-size: 12px;
												}
												.info-line {
														margin: 10px 0;
														padding: 10px;
														background-color: #f9f9f9;
														border-radius: 4px;
												}
												.message-box {
														background-color: #f5f5f5;
														padding: 15px;
														border-radius: 4px;
														margin-top: 15px;
												}
										</style>
								</head>
								<body>
										<div class="header">
												<h2>🐾 Nouveau message de contact Beasty 🐾</h2>
										</div>
										
										<div class="content">
												<div class="info-line">
														<strong>De:</strong> ${firstName} ${lastName}
												</div>
												<div class="info-line">
														<strong>Email:</strong> ${email}
												</div>
												<div class="info-line">
														<strong>Sujet:</strong> ${subject}
												</div>
												
												<div class="message-box">
														<strong>Message:</strong><br><br>
														${message}
												</div>
										</div>
										
										<div class="footer">
												<p>Ce message a été envoyé via le formulaire de contact de Beasty.</p>
												<p>© ${new Date().getFullYear()} Beasty - Tous droits réservés</p>
										</div>
								</body>
						</html>
						`
			};

			await transporter.sendMail(mailOptions);

			return { success: true };
		} catch (error) {
			console.error('Erreur lors de l\'envoi de l\'email:', error);
			return fail(500, {
				success: false,
				message: 'Erreur lors de l\'envoi de l\'email'
			});
		}
	}
};